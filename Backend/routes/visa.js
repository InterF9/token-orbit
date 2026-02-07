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

// GET - Get queue position count for authenticated user's latest application
router.get("/", auth, async (req, res) => {
  try {
    const currentResult = await db.query(
      `SELECT id, priority_score
       FROM visa_applications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [req.user.id]
    );

    if (currentResult.rows.length === 0) {
      return res.json({ queue_ahead: 0 });
    }

    const { id, priority_score } = currentResult.rows[0];
    const countResult = await db.query(
      `SELECT COUNT(*)::int AS queue_ahead
       FROM visa_applications
       WHERE priority_score >= $1
         AND id <> $2`,
      [priority_score, id]
    );

    res.json({ queue_ahead: countResult.rows[0].queue_ahead });
  } catch (error) {
    console.error("Fetch queue count error:", error);
    res.status(500).json({ error: "Failed to fetch queue count" });
  }
});

export default router;
