const express = require('express');
const router = express.Router();
const { addExpense, getExpenses , deleteExpense } = require('../controllers/expenseController');

// Add a new expense
router.post('/add', addExpense);

// Get all expenses for a user
router.get('/:userId', getExpenses);

// Delete an expense
router.delete('/:expenseId', deleteExpense);

module.exports = router;
