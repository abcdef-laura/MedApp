import { Router } from "express";
import { db } from "../models/db";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// GET all patients (protected)
router.get("/", authMiddleware, (req, res) => {
  db.query("SELECT * FROM patients", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET patient by id (protected)
router.get("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM patients WHERE id = ?", [id], (err, results: any[]) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});

export default router;
