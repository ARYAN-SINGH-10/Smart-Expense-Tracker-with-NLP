const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const { extractExpense } = require('../utils/nlp');
const router = express.Router();

// Middleware to authenticate
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

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const [expenses] = await db.query('SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC', [req.user.id]);
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add manual expense
router.post('/manual', async (req, res) => {
  const { amount, category, description, date } = req.body;
  if (!amount || !category || !date) {
    return res.status(400).json({ error: 'Amount, category, and date are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO expenses (user_id, name, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, req.user.name, amount, category, description, date]
    );
    res.status(201).json({ message: 'Expense added', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add NLP expense
router.post('/nlp', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text input is required' });

  const parsedData = extractExpense(text);
  
  if (!parsedData.amount) {
    return res.status(400).json({ error: 'Could not extract amount from text. Please enter manually.' });
  }

  const date = new Date().toISOString().split('T')[0]; // Current date

  try {
    const [result] = await db.query(
      'INSERT INTO expenses (user_id, name, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, req.user.name, parsedData.amount, parsedData.category, parsedData.description, date]
    );
    res.status(201).json({ 
      message: 'Expense added via NLP', 
      id: result.insertId,
      parsed: {
        amount: parsedData.amount,
        category: parsedData.category,
        date
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM expenses WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
