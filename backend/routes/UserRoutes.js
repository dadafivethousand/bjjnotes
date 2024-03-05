const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/reset', userController.sendResetEmail)
router.post('/update', userController.updatePassword)
router.post('/change', userController.changePassword)

module.exports = router;
