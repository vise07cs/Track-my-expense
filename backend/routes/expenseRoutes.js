const express = require('express');
const router = express.Router();
const {authenticate}=require("../middleware/authMiddleware")
const { addExpense, getExpenses , deleteExpense } = require('../controllers/expenseController');

// Add a new expense
router.post('/add',authenticate, addExpense);

// Get all expenses for a user
router.get('/',authenticate, getExpenses);

// Delete an expense
router.delete('/:id',authenticate, deleteExpense);

module.exports = router;
