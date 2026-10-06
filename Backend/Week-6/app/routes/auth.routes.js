const express = require('express');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// POST /signup → create a new user
router.post('/signup', authController.signup);

// POST /login → authenticate an existing user
router.post('/login', authController.login);

// Protected test route
router.get('/me', authenticate, (req, res) => {
  res.json({
    message: 'Authentication successful',
    userId: req.userId
  });
});

module.exports = router;