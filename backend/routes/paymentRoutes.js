// backend/routes/paymentRoutes.js
const express = require('express');
const { createOrder } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-order', authenticate, createOrder);

module.exports = router;
