const express = require('express');
const router = express.Router();
const {details} = require('../controller/userInfo')

router.route('/sendDetails').post(details);

module.exports = router;