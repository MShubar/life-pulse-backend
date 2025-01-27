const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware to verify JWT token before accessing protected routes

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });  

    }
};

module.exports = verifyToken;