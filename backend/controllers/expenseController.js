const Expense = require('../models/expenseModel');
const User = require('../models/userModel');

// Add new expense
const addExpense = async (req, res) => {
  try {
    // console.log("Request Body:", req.body); // Debugging line

    const {  amount, description, category } = req.body;
    const { userId } = req.user // Get userId from authenticated user

    if (!amount || !description || !category || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // console.log("User ID from body:", userId); // Debugging line

    const expense = await Expense.create({ userId, amount, description, category });
    res.status(201).json({ message: 'Expense added successfully', expense });

    // console.log("Expense created:", expense); // Debugging line

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Fetch all expenses for a user
const getExpenses = async (req, res) => {
  try {
    const { userId } = req.user; // Get userId from authenticated user
    
    const expenses = await Expense.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
    res.status(200).json({ expenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

//delete expense

 const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from authenticated user
    const expenseId = req.params.id; // Get expenseId from URL params

    const expense = await Expense.findByPk(expenseId);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    if (expense.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden: Cannot delete others expense' });
    }

    await expense.destroy();
    res.status(200).json({ message: 'Expense deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

 

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense
};