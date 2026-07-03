const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a document title'],
    default: 'Untitled Document'
  },
  content: {
    type: String,
    default: ''
  },
  format: {
    type: String,
    enum: ['txt', 'md', 'html', 'json', 'pdf', 'docx'],
    default: 'md'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  fileUrl: {
    type: String, // Path to stored file if applicable
    default: ''
  },
  size: {
    type: Number, // File size in bytes
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);
