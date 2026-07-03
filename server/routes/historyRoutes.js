const express = require('express');
const router = express.Router();
const { getHistory, deleteHistoryRecord } = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getHistory);

router.route('/:id')
  .delete(protect, deleteHistoryRecord);

module.exports = router;
