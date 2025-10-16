const Expense = require('../models/expenseModel');
const User = require('../models/userModel');

// Add new expense
const addExpense = async (req, res) => {
  try {
    const { userId, amount, description, category } = req.body;

    if (!amount || !description || !category || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const expense = await Expense.create({ userId, amount, description, category });
    res.status(201).json({ message: 'Expense added successfully', expense });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Fetch all expenses for a user
const getExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
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
    const { expenseId } = req.params;
    const expense = await Expense.findByPk(expenseId);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    await expense.destroy();
    res.status(200).json({ message: 'Expense deleted successfully' });
  }catch{
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}



module.exports = {
  addExpense,
  getExpenses,
  deleteExpense
};