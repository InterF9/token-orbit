import express from "express";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";
import { db } from "../config/db.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, resident_id } = req.body;
    
    // Validate required fields
    if (!name || !email || !password || !phone || !resident_id) {
      return res.status(400).json({ error: "Name, email, password, phone, and resident_id are required" });
    }
    
    // Check if email already exists
    const existingUser = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }
    
    const hash = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (name, email, password, phone, resident_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, phone, resident_id",
      [name, email, hash, phone, resident_id]
    );

    const newUser = result.rows[0];
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ id: newUser.id, name: newUser.name }, secretKey, { expiresIn: "1d" });


    res.status(201).json({ 
      token, 
      user: { 
        id: newUser.id, 
        email: newUser.email, 
        name: newUser.name,
        phone: newUser.phone,
        resident_id: newUser.resident_id
      } 
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.rows[0].id , name: user.rows[0].name }, secretKey, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
