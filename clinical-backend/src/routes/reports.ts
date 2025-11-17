import { Router } from 'express';
import { db } from '../models/report';

const router = Router();

// Get all reports with patient info
router.get('/', (req, res) => {
  const query = `
    SELECT reports.id, reports.report_date, reports.findings,
           patients.id AS patientId, patients.name AS patient_name
    FROM reports
    JOIN patients ON reports.patientId = patients.id
  `;
  db.query(query, (err, results: any) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a new report
router.post('/', (req, res) => {
  const { patientId, report_date, findings } = req.body;
  db.query(
    'INSERT INTO reports (patientId, report_date, findings) VALUES (?, ?, ?)',
    [patientId, report_date, findings],
    (err, result: any) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Report added', id: result.insertId });
    }
  );
});

// Delete report
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM reports WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Report deleted' });
  });
});

export default router;
