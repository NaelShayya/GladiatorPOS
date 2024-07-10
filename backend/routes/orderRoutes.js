const express = require('express');
const { getOrders, createOrder } = require('../controllers/orderController');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to protect routes

// Route to get all orders
router.get('/orders', auth, getOrders);

// Route to create a new order
router.post('/orders', auth, createOrder);

module.exports = router;
