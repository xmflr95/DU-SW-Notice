const express = require('express');
const router = express.Router();
const noticeController = require('./controllers/noticeController');

// home
router.get('/', noticeController.home)

module.exports = router;