import { Router } from "express";
import { db } from "../models/db";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Get all reports with patient info (protected)
router.get("/", authMiddleware, (req, res) => {
  const query = `
    SELECT reports.id, reports.report_date, reports.findings,
           patients.id AS patientId, patients.name AS patient_name
    FROM reports
    JOIN patients ON reports.patientId = patients.id
  `;

  db.query(query, (err, results: any[]) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add new report (protected)
router.post("/", authMiddleware, (req, res) => {
  const { patientId, report_date, findings } = req.body;

  db.query(
    "INSERT INTO reports (patientId, report_date, findings) VALUES (?, ?, ?)",
    [patientId, report_date, findings],
    (err, result: any) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Report added", id: result.insertId });
    }
  );
});

// Delete report (protected)
router.delete("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM reports WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Report deleted" });
  });
});

export default router;
