import express from "express";
import { db } from "../models/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: "Missing fields" });

  // verificăm dacă username sau email există deja
  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    async (err, results: any) => {
      if (err) return res.status(500).json(err);
      if (results.length > 0) return res.status(400).json({ message: "User already exists" });

      // hash parola
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result: any) => {
          if (err) return res.status(500).json(err);
          res.json({ message: "User created", id: result.insertId });
        }
      );
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Missing fields" });

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results: any) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(400).json({ message: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Login failed" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    res.json({ token });
  });
});

// LOGOUT (frontend doar șterge tokenul din localStorage)
router.post("/logout", (req, res) => {
  // nu trebuie să facem nimic pe server pentru JWT stateless
  res.json({ message: "Logged out" });
});

export default router;
