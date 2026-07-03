const express = require('express');
const router = express.Router();
const { 
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument
} = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getDocuments)
  .post(protect, createDocument);

router.route('/:id')
  .get(protect, getDocument)
  .put(protect, updateDocument)
  .delete(protect, deleteDocument);

module.exports = router;
