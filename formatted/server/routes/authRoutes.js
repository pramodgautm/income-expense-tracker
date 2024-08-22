// /routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { 
  renderLogin, 
  handleLogin, 
  handleLogout, 
  renderRegister, 
  handleRegister 
} = require('../controllers/authController');
const redirectBasedOnAuth = require('../middleware/redirectBasedOnAuth');

router.use(redirectBasedOnAuth);

router.get('/login', renderLogin);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);
router.get('/register', renderRegister);
router.post('/register', handleRegister);

module.exports = router;