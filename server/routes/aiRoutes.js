const express = require('express');
const router = express.Router();
const { 
  generateDoc, 
  summarizeText, 
  rewriteText, 
  fixGrammar, 
  translateText, 
  generateQuestions, 
  generateFlashcards 
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateDoc);
router.post('/summarize', protect, summarizeText);
router.post('/rewrite', protect, rewriteText);
router.post('/grammar', protect, fixGrammar);
router.post('/translate', protect, translateText);
router.post('/questions', protect, generateQuestions);
router.post('/flashcards', protect, generateFlashcards);

module.exports = router;
