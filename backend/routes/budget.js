const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Auth middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

router.use(authenticate);

// GET current month's budget
router.get('/', async (req, res) => {
  const month = new Date().toISOString().slice(0, 7); // YYYY-MM
  try {
    const [rows] = await db.query(
      'SELECT * FROM budgets WHERE user_id = ? AND month = ?',
      [req.user.id, month]
    );
    if (rows.length === 0) {
      return res.json({ month, amount: null });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST/UPDATE monthly budget
router.post('/', async (req, res) => {
  const { amount } = req.body;
  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
    return res.status(400).json({ error: 'Please provide a valid budget amount' });
  }

  const month = new Date().toISOString().slice(0, 7); // YYYY-MM

  try {
    // Upsert: insert or update if exists
    await db.query(
      `INSERT INTO budgets (user_id, name, month, amount)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE amount = VALUES(amount)`,
      [req.user.id, req.user.name, month, parseFloat(amount)]
    );
    res.json({ message: 'Budget set', month, amount: parseFloat(amount) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
