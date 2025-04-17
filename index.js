// index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'talentflow',
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL Database');
});

// Auth Routes
app.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.query(
    'INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)',
    [name, email, password, role],
    (err, result) => {
      if (err) {
        console.error('❌ Error registering user:', err);
        return res.status(500).json({ error: 'User registration failed' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    }
  );
});

// index.js

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.query('SELECT * FROM Users WHERE Email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (results.length === 0 || results[0].Password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    const token = jwt.sign(
      { id: user.User_ID, role: user.Role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    // ✅ Return userId as well
    res.json({
      success: true,
      token,
      role: user.Role,
      userId: user.User_ID
    });
  });
});


// Route Files
const adminRoutes = require('./routes/admin');
const hrRoutes = require('./routes/hr');
const candidateRoutes = require('./routes/candidate');
const interviewerRoutes = require('./routes/interviewer');

// Mount Routes
app.use('/admin', adminRoutes);
app.use('/hr', hrRoutes);
app.use('/candidate', candidateRoutes);
app.use('/interviewer', interviewerRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
