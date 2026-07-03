const fs = require('fs');
const path = require('path');
const conversionService = require('../services/conversionService');
const History = require('../models/History');

// Ensure exports directory exists
const exportsDir = path.join(__dirname, '../exports');
if (!fs.existsSync(exportsDir)) {
  fs.mkdirSync(exportsDir, { recursive: true });
}

// @desc    Convert file format
// @route   POST /api/conversions/convert
// @access  Private
exports.convertFile = async (req, res) => {
  try {
    const file = req.file;
    const { targetFormat } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    if (!targetFormat) {
      return res.status(400).json({ success: false, message: 'Target format is required' });
    }

    const sourceExt = path.extname(file.originalname).toLowerCase().replace('.', '');
    const sourcePath = file.path;
    const fileBuffer = fs.readFileSync(sourcePath);
    let outputBuffer;
    
    // Convert logic
    if (sourceExt === 'md' && targetFormat === 'html') {
      const html = conversionService.markdownToHtml(fileBuffer.toString('utf-8'));
      outputBuffer = Buffer.from(html, 'utf-8');
    } else if (sourceExt === 'html' && targetFormat === 'md') {
      const md = conversionService.htmlToMarkdown(fileBuffer.toString('utf-8'));
      outputBuffer = Buffer.from(md, 'utf-8');
    } else if (sourceExt === 'docx' && targetFormat === 'html') {
      const html = await conversionService.docxToHtml(fileBuffer);
      outputBuffer = Buffer.from(html, 'utf-8');
    } else if (sourceExt === 'html' && targetFormat === 'docx') {
      outputBuffer = await conversionService.htmlToDocx(fileBuffer.toString('utf-8'));
    } else if (sourceExt === 'txt' && targetFormat === 'pdf') {
      outputBuffer = await conversionService.textToPdf(fileBuffer.toString('utf-8'));
    } else if (sourceExt === 'docx' && targetFormat === 'pdf') {
      const mammoth = require('mammoth');
      const textResult = await mammoth.extractRawText({ buffer: fileBuffer });
      outputBuffer = await conversionService.textToPdf(textResult.value);
    } else {
      return res.status(400).json({ 
        success: false, 
        message: `Conversion from ${sourceExt} to ${targetFormat} is not currently supported in this limited environment.` 
      });
    }

    const outputFileName = `converted-${Date.now()}.${targetFormat}`;
    const outputPath = path.join(exportsDir, outputFileName);
    fs.writeFileSync(outputPath, Buffer.from(outputBuffer));

    // Log history
    await History.create({
      user: req.user.id,
      actionType: 'convert',
      details: `Converted ${file.originalname} to ${targetFormat}`
    });

    res.json({
      success: true,
      downloadUrl: `/exports/${outputFileName}`
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
