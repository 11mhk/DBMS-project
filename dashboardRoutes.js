const express = require('express');
const router = express.Router();
const db = require('../db'); // Your database connection

// ==================== Candidate Dashboard ====================
router.get('/candidate/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const [candidate] = await db.query(
            `SELECT * FROM Candidates WHERE Email = ?`, [email]
        );

        const [rounds] = await db.query(
            `SELECT hr.Round_Number, hr.Status, i.Name AS Interviewer 
             FROM HR_Rounds hr
             JOIN Interviewers i ON hr.Interviewer_ID = i.Interviewer_ID
             JOIN Candidates c ON hr.Candidate_ID = c.Candidate_ID
             WHERE c.Email = ?`, [email]
        );

        const [onboarding] = await db.query(
            `SELECT o.Training_Schedule, o.Joining_Date, o.Team_Assignment, a.Asset_Name 
             FROM Onboarding o 
             JOIN Candidates c ON o.Candidate_ID = c.Candidate_ID
             JOIN Assets a ON o.Asset_ID = a.Asset_ID
             WHERE c.Email = ?`, [email]
        );

        const [notifications] = await db.query(
            `SELECT Message FROM Notifications n
             JOIN Candidates c ON n.Candidate_ID = c.Candidate_ID
             WHERE c.Email = ?`, [email]
        );

        res.json({
            candidate: candidate[0],
            rounds,
            onboarding: onboarding[0],
            notifications
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==================== HR Dashboard ====================
router.get('/hr/:email', async (req, res) => {
    try {
        const [interviewRounds] = await db.query(
            `SELECT hr.Round_ID, c.Name as Candidate, hr.Round_Number, hr.Status, i.Name as Interviewer
             FROM HR_Rounds hr
             JOIN Candidates c ON hr.Candidate_ID = c.Candidate_ID
             JOIN Interviewers i ON hr.Interviewer_ID = i.Interviewer_ID`
        );

        const [candidates] = await db.query(`SELECT * FROM Candidates`);
        const [onboarded] = await db.query(`SELECT * FROM Onboarding`);

        res.json({ interviewRounds, candidates, onboarded });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==================== Interviewer Dashboard ====================
router.get('/interviewer/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const [interviewer] = await db.query(
            `SELECT * FROM Interviewers WHERE Email = ?`, [email]
        );

        const [rounds] = await db.query(
            `SELECT hr.Round_ID, c.Name as Candidate, hr.Round_Number, hr.Status 
             FROM HR_Rounds hr
             JOIN Candidates c ON hr.Candidate_ID = c.Candidate_ID
             WHERE hr.Interviewer_ID = (
                SELECT Interviewer_ID FROM Interviewers WHERE Email = ?
             )`, [email]
        );

        res.json({ interviewer: interviewer[0], interviewRounds: rounds });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==================== Admin Dashboard ====================
router.get('/admin/:email', async (req, res) => {
    try {
        const [users] = await db.query(`SELECT * FROM Users`);
        const [departments] = await db.query(`SELECT * FROM Departments`);
        const [assets] = await db.query(`SELECT * FROM Assets`);
        res.json({ users, departments, assets });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
