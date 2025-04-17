// routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware'); // ✅ CORRECT

// GET Admin Overview Stats
router.get('/overview', verifyToken('Admin'), (req, res) => {
  const queries = [
    'SELECT COUNT(*) AS totalUsers FROM Users',
    'SELECT COUNT(*) AS totalCandidates FROM Candidates',
    'SELECT COUNT(*) AS totalInterviewers FROM Interviewers',
    'SELECT COUNT(*) AS totalAssets FROM Assets'
  ];

  Promise.all(queries.map(q =>
    new Promise((resolve, reject) =>
      db.query(q, (err, result) => (err ? reject(err) : resolve(result[0])))
    )
  ))
    .then(([users, candidates, interviewers, assets]) => {
      res.json({
        totalUsers: users.totalUsers,
        totalCandidates: candidates.totalCandidates,
        totalInterviewers: interviewers.totalInterviewers,
        totalAssets: assets.totalAssets
      });
    })
  
});

// ✅ NEW: Get all users
router.get('/users', verifyToken('Admin'), (req, res) => {
  const sql = 'SELECT User_ID, Name, Email, Role FROM Users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Failed to fetch users:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(results);
  });
});

module.exports = router;
