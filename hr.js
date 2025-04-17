// routes/hr.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware'); // ✅ CORRECT

router.get('/candidates', verifyToken('HR'), (req, res) => {
  db.query('SELECT * FROM Candidates', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

module.exports = router;
