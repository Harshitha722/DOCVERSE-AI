const History = require('../models/History');

// @desc    Get user history
// @route   GET /api/history
// @access  Private
exports.getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user.id })
      .populate('resourceId', 'title format')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, count: history.length, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a history record
// @route   DELETE /api/history/:id
// @access  Private
exports.deleteHistoryRecord = async (req, res) => {
  try {
    const record = await History.findOne({ _id: req.params.id, user: req.user.id });

    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    await record.remove();

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
