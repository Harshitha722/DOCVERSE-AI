const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini API
// Make sure to add GEMINI_API_KEY to your .env file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Generate content using Gemini
 * @param {string} prompt - The user prompt
 * @param {string} systemInstruction - Optional system instruction to guide the model
 * @returns {string} The generated text
 */
const generateContent = async (prompt, systemInstruction = '') => {
  try {
    const config = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: prompt,
      config: config
    });
    return response.text;
  } catch (error) {
    console.error('Gemini API Error details:', error);
    throw new Error(error.message || 'Failed to generate content with AI');
  }
};

/**
 * Common AI Prompts
 */
const prompts = {
  generateDocument: (prompt, format) => `Create a professional document based on the following request: "${prompt}". Please format the output suitable for a ${format.toUpperCase()} file. Include structure like headings, lists, and paragraphs. Return ONLY the document content in markdown format.`,
  summarize: (text) => `Summarize the following text comprehensively but concisely:\n\n${text}`,
  rewrite: (text) => `Rewrite the following text to be more professional, clear, and engaging:\n\n${text}`,
  grammar: (text) => `Fix any grammar and spelling mistakes in the following text, keeping the original meaning intact:\n\n${text}`,
  translate: (text, language) => `Translate the following text into ${language}:\n\n${text}`,
  questions: (text) => `Generate 5 interview questions based on the following text:\n\n${text}`,
  mcqs: (text) => `Generate 5 multiple choice questions (with 4 options each and indicate the correct answer) based on the following text:\n\n${text}`,
  flashcards: (text) => `Generate 5 flashcards (Front: Concept, Back: Explanation) based on the following text. Format as Question/Answer pairs:\n\n${text}`
};

module.exports = {
  generateContent,
  prompts
};
