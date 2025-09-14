const express = require('express');
const router = express.Router();
const { signup, login, updatePassword } = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/update-password', authenticate, updatePassword);

module.exports = router;
