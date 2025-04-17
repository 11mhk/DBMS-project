// routes/interviewer.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware');

// ✅ Get all interview rounds assigned to an interviewer
router.get('/:id/rounds', verifyToken('Interviewer'), (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT hr.Round_ID, hr.Round_Number, hr.Status,
           c.Name AS CandidateName, c.Position_Applied AS Position
    FROM HR_Rounds hr
    JOIN Candidates c ON hr.Candidate_ID = c.Candidate_ID
    WHERE hr.Interviewer_ID = ?
    ORDER BY hr.Round_Number
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching interview rounds:", err);
      return res.status(500).json({ error: "Failed to get rounds" });
    }
    res.json(results);
  });
});

// ✅ Update interview round status
router.put('/rounds/:roundId/status', verifyToken('Interviewer'), (req, res) => {
  const roundId = req.params.roundId;
  const { status } = req.body;

  const sql = `UPDATE HR_Rounds SET Status = ? WHERE Round_ID = ?`;

  db.query(sql, [status, roundId], (err, result) => {
    if (err) {
      console.error("❌ Error updating status:", err);
      return res.status(500).json({ error: "Failed to update round status" });
    }
    res.json({ message: "Status updated successfully" });
  });
});

module.exports = router;
