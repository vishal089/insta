const express = require('express');
const router = express.Router();
const {signup,login,sendOTP, verifyOTP} = require('../controller/authController');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/sendOTP').post(sendOTP);
router.route('/verifyOTP').post(verifyOTP)

module.exports = router ; 