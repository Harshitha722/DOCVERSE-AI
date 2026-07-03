const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { convertFile } = require('../controllers/converterController');
const { protect } = require('../middleware/authMiddleware');

router.post('/convert', protect, upload.single('file'), convertFile);

module.exports = router;
