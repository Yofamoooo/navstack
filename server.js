const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan jika pakai password
  database: 'navstack'
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal:', err.message);
    process.exit(1);
  }
  console.log('✅ Terhubung ke database MySQL (navstack)');
});

// Endpoint: Ambil komponen berdasarkan type dan framework
app.get('/api/components/:type/:framework', (req, res) => {
  const { type, framework } = req.params;

  const sql = `
    SELECT id, name, framework, content, script
    FROM components
    WHERE type = ? AND framework = ?
    LIMIT 1
  `;

  db.query(sql, [type, framework], (err, results) => {
    if (err) {
      console.error('Query error:', err.message);
      return res.status(500).json({ error: 'Database query error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Component not found' });
    }

    res.json(results);
  });
});

// Endpoint: Ambil semua navbar (untuk grouped view)
app.get('/api/navbars', (req, res) => {
  const sql = `
    SELECT id, name, type, framework, content, script
    FROM components
    WHERE type = 'navbar'
    ORDER BY name ASC, framework ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Query error:', err.message);
      return res.status(500).json({ error: 'Database query error' });
    }

    res.json(results);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 API server berjalan di http://localhost:${PORT}`);
});
