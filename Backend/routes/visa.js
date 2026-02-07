import express from "express";
import { db } from "../config/db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST - Create a new visa application
router.post("/", auth, async (req, res) => {
  try {
    const { full_name, email, nationality, current_location, priority_score } = req.body;

    if (!full_name || !email) {
      return res.status(400).json({ error: "Full name and email are required" });
    }

    const result = await db.query(
      `INSERT INTO visa_applications (user_id, full_name, email, nationality, current_location, priority_score)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [req.user.id, full_name, email, nationality, current_location, priority_score]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Visa application error:", error);
    res.status(500).json({ error: "Failed to create visa application" });
  }
});

// GET - Get all visa applications
router.get("/", auth, async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM visa_applications ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Fetch visa applications error:", error);
    res.status(500).json({ error: "Failed to fetch visa applications" });
  }
});

export default router;
