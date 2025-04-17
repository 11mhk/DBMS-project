// middleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(403).json({ error: 'Access denied. Token missing.' });
    }

    // If token is sent as "Bearer <token>", extract the actual token
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    jwt.verify(token, process.env.JWT_SECRET || 'root', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token.' });
      }

      // If a role is required, check it
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden: Invalid role.' });
      }

      req.user = decoded; // Attach decoded payload (like userId, role) to request
      next();
    });
  };
};

module.exports = verifyToken;
