const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = "my-secret-key"; // Later move to .env

const authenticate = async (req, res, next) => {
    const authHeader = req.header('Authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
        const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { userId: ... }
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }








};

module.exports = {authenticate};