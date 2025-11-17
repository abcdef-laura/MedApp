import { Router } from 'express';
import { db } from '../models/patient';

const router = Router();

// GET all patients
router.get('/', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET patient by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    'SELECT * FROM patients WHERE id = ?',
    [id],
    (err, results: any) => {  // <-- aici folosim `any` temporar
      if (err) return res.status(500).json(err);
      res.json(results[0]);    // TypeScript știe că results[0] există
    }
  );
});


export default router;
