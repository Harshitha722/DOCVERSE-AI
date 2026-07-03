const Document = require('../models/Document');
const History = require('../models/History');

// @desc    Get all documents for a user
// @route   GET /api/documents
// @access  Private
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json({ success: true, count: documents.length, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single document
// @route   GET /api/documents/:id
// @access  Private
exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, user: req.user.id });

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new document (e.g. from editor or upload)
// @route   POST /api/documents
// @access  Private
exports.createDocument = async (req, res) => {
  try {
    const { title, content, format } = req.body;

    const document = await Document.create({
      title,
      content,
      format: format || 'md',
      user: req.user.id
    });

    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update document
// @route   PUT /api/documents/:id
// @access  Private
exports.updateDocument = async (req, res) => {
  try {
    let document = await Document.findOne({ _id: req.params.id, user: req.user.id });

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    document = await Document.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, user: req.user.id });

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    await document.remove();

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
