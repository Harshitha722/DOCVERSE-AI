const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  actionType: {
    type: String,
    enum: ['generate', 'convert', 'edit', 'upload', 'download'],
    required: true
  },
  resourceId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Document'
  },
  details: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('History', historySchema);
