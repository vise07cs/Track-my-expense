// backend/models/orderModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Order = sequelize.define('Order', {
  orderId: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.ENUM('PENDING', 'SUCCESSFUL', 'FAILED'), defaultValue: 'PENDING' },
  paymentSessionId: { type: DataTypes.STRING },
});

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = Order;
