const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to protect routes

// Route to register a new user
router.post('/users/register', registerUser);

// Route to login a user
router.post('/users/login', loginUser);

// Route to get user profile (protected)
router.get('/users/profile', auth, getUserProfile);

module.exports = router;
