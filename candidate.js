// routes/candidate.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware'); // ✅ Token middleware

// 🔹 Route 1: Get Interview Rounds for Candidate
router.get('/rounds', verifyToken('Candidate'), (req, res) => {
  const candidateId = req.user?.id;
  console.log('🎯 GET /candidate/rounds | Candidate ID:', candidateId);

  const sql = `SELECT * FROM HR_Rounds WHERE Candidate_ID = ?`;
  db.query(sql, [candidateId], (err, results) => {
    if (err) {
      console.error('❌ Error fetching rounds:', err);
      return res.status(500).json({ error: 'Database error fetching rounds', details: err });
    }
    res.json(results);
  });
});

// 🔹 Route 2: Get Onboarding Info for Candidate
router.get('/onboarding', verifyToken('Candidate'), (req, res) => {
  const candidateId = req.user?.id;
  console.log('🎯 GET /candidate/onboarding | Candidate ID:', candidateId);

  const sql = `SELECT * FROM Onboarding WHERE Candidate_ID = ?`;
  db.query(sql, [candidateId], (err, results) => {
    if (err) {
      console.error('❌ Error fetching onboarding:', err);
      return res.status(500).json({ error: 'Database error fetching onboarding', details: err });
    }

    if (results.length === 0) {
      return res.json(null); // No onboarding record yet
    }

    res.json(results[0]);
  });
});

// 🔹 Route 3: Get Notifications for Candidate
router.get('/notifications', verifyToken('Candidate'), (req, res) => {
  const candidateId = req.user?.id;
  console.log('🎯 GET /candidate/notifications | Candidate ID:', candidateId);

  const sql = `SELECT * FROM Notifications WHERE Candidate_ID = ? ORDER BY Notification_ID DESC`;
  db.query(sql, [candidateId], (err, results) => {
    if (err) {
      console.error('❌ Error fetching notifications:', err);
      return res.status(500).json({ error: 'Database error fetching notifications', details: err });
    }
    res.json(results);
  });
});

module.exports = router;
