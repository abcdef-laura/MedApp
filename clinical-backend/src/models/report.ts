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

db.connect(err => {
    if (err) throw err;
    console.log('✅ Connected to MySQL (from report model)');
});

// Creare tabel dacă nu există
db.query(`
CREATE TABLE IF NOT EXISTS reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100),
    report_date DATE,
    findings TEXT
)
`, (err) => {
    if (err) throw err;
    console.log('✅ Reports table ready');
});
