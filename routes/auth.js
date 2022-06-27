const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.put('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
