const { generateContent, prompts } = require('../services/geminiService');
const Document = require('../models/Document');
const History = require('../models/History');

// @desc    Generate a new document from prompt
// @route   POST /api/ai/generate
// @access  Private
exports.generateDoc = async (req, res) => {
  try {
    const { prompt, format } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    const aiPrompt = prompts.generateDocument(prompt, format || 'md');
    const systemInstruction = 'You are an expert document creator. Produce high-quality, professional, well-formatted content.';
    
    const content = await generateContent(aiPrompt, systemInstruction);

    // Save generated document to database
    const document = await Document.create({
      title: `Generated: ${prompt.substring(0, 30)}...`,
      content,
      format: format || 'md',
      user: req.user.id
    });

    // Log history
    await History.create({
      user: req.user.id,
      actionType: 'generate',
      resourceId: document._id,
      details: `Generated document from prompt: ${prompt.substring(0, 50)}`
    });

    res.status(201).json({ success: true, document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Generic function for AI Assistant Actions
const processAssistantAction = async (req, res, promptFunction, actionName) => {
  try {
    const { text, language } = req.body;
    
    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }

    let aiPrompt;
    if (language && actionName === 'translate') {
      aiPrompt = promptFunction(text, language);
    } else {
      aiPrompt = promptFunction(text);
    }

    const systemInstruction = `You are a helpful AI document assistant. Perform the requested ${actionName} task accurately.`;
    const result = await generateContent(aiPrompt, systemInstruction);

    // Log history
    await History.create({
      user: req.user.id,
      actionType: 'edit',
      details: `AI Assistant used: ${actionName}`
    });

    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Summarize text
// @route   POST /api/ai/summarize
// @access  Private
exports.summarizeText = (req, res) => processAssistantAction(req, res, prompts.summarize, 'summarize');

// @desc    Rewrite text
// @route   POST /api/ai/rewrite
// @access  Private
exports.rewriteText = (req, res) => processAssistantAction(req, res, prompts.rewrite, 'rewrite');

// @desc    Fix grammar
// @route   POST /api/ai/grammar
// @access  Private
exports.fixGrammar = (req, res) => processAssistantAction(req, res, prompts.grammar, 'grammar check');

// @desc    Translate text
// @route   POST /api/ai/translate
// @access  Private
exports.translateText = (req, res) => processAssistantAction(req, res, prompts.translate, 'translate');

// @desc    Generate interview questions
// @route   POST /api/ai/questions
// @access  Private
exports.generateQuestions = (req, res) => processAssistantAction(req, res, prompts.questions, 'questions generation');

// @desc    Generate flashcards
// @route   POST /api/ai/flashcards
// @access  Private
exports.generateFlashcards = (req, res) => processAssistantAction(req, res, prompts.flashcards, 'flashcard generation');
