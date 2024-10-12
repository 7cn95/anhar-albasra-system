const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// صفحة تسجيل الدخول
router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'تسجيل الدخول' });
});

// معالجة تسجيل الدخول
router.post('/login', authController.login);

// تسجيل الخروج
router.get('/logout', authController.logout);

module.exports = router;
