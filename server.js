// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const validator = require('validator');

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Rate limiter (100 req per 15 menit per IP)
const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use('/api/subscribe', subscribeLimiter);

// 🔌 Koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Ganti jika pakai password
  database: 'navstack',
});

db.connect((err) => {
  if (err) {
    console.error('❌ Koneksi ke database gagal:', err.message);
    process.exit(1);
  }
  console.log('✅ Terhubung ke database MySQL (navstack)');
});

// 🔹 Endpoint: Subscribe Newsletter
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  const sql = `INSERT INTO subscribers (email) VALUES (?)`;
  db.query(sql, [email], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already subscribed.' });
      }
      console.error('❌ Insert error:', err.message);
      return res.status(500).json({ message: 'Database insert error.' });
    }

    res.status(201).json({ message: 'Thank you for subscribing!' });
  });
});

// 🔹 Endpoint: Komponen by type & framework
app.get('/api/components/:type/:framework', (req, res) => {
  const { type, framework } = req.params;
  const sql = `
    SELECT c.id, c.name, f.name AS framework, f.icon, f.description, c.content, c.script
    FROM components c
    JOIN frameworks f ON c.framework_id = f.id
    WHERE c.type = ? AND f.name = ?
    LIMIT 1
  `;
  db.query(sql, [type, framework], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query error' });
    if (results.length === 0) return res.status(404).json({ message: 'Component not found' });
    res.json(results[0]);
  });
});

// 🔹 Endpoint: Semua navbar
app.get('/api/navbars', (req, res) => {
  const sql = `
    SELECT c.id, c.name, c.type, f.name AS framework, f.icon, f.description, c.content, c.script
    FROM components c
    JOIN frameworks f ON c.framework_id = f.id
    WHERE c.type = 'navbar'
    ORDER BY f.name ASC, c.name ASC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query error' });
    res.json(results);
  });
});

// 🔹 Endpoint: Semua frameworks
app.get('/api/frameworks', (req, res) => {
  const sql = `SELECT id, name, icon, description FROM frameworks ORDER BY name ASC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query error' });
    res.json(results);
  });
});

// ✅ Jalankan server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 API server berjalan di http://localhost:${PORT}`);
});
