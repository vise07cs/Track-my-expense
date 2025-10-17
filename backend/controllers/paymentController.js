// backend/controllers/paymentController.js
const Order = require('../models/orderModel');
const cashfreeService = require('../services/cashfreeService');

const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT auth middleware
    const { amount } = req.body;

    if (!amount) return res.status(400).json({ message: 'Amount is required' });

    // Generate a unique orderId
    const orderId = `ORDER_${Date.now()}`;

    // Save order in DB with PENDING status
    const order = await Order.create({
      orderId,
      userId,
      amount,
      status: 'PENDING'
    });

    // Generate Cashfree payment session ID
    const paymentSessionId = await cashfreeService.createOrder(
      orderId,
      amount.toString(),
      'INR',
      userId.toString(),
      req.user.phone || '9999999999', // optional
      req.user.name,
      req.user.email
    );

    // Save paymentSessionId in DB
    order.paymentSessionId = paymentSessionId;
    await order.save();

    // Send session ID to frontend
    res.status(201).json({ paymentSessionId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

module.exports = { createOrder };
