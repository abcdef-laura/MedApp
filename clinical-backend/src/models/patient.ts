import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Creează tabela patients dacă nu există
db.query(`
  CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    birthDate DATE,
    gender ENUM('male','female')
  )
`, (err) => {
    if (err) throw err;
    console.log('✅ Patients table ready');
});
