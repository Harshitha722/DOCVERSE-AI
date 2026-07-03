const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const mammoth = require('mammoth');
const htmlDocx = require('html-docx-js');
const MarkdownIt = require('markdown-it');
const TurndownService = require('turndown');
// Note: puppeteer requires chromium download, might fail in some envs if not set up
// const puppeteer = require('puppeteer');

const md = new MarkdownIt();
const turndownService = new TurndownService();

/**
 * Convert Markdown to HTML
 */
const markdownToHtml = (markdown) => {
  return md.render(markdown);
};

/**
 * Convert HTML to Markdown
 */
const htmlToMarkdown = (html) => {
  return turndownService.turndown(html);
};

/**
 * Convert HTML to DOCX buffer
 */
const htmlToDocx = (html) => {
  return htmlDocx.asBlob(html);
};

/**
 * Convert DOCX buffer to HTML
 */
const docxToHtml = async (buffer) => {
  const result = await mammoth.convertToHtml({ buffer });
  return result.value;
};

/**
 * Basic PDF generation using PDFKit (handles pagination and wrapping)
 */
const textToPdf = (text) => {
  return new Promise((resolve, reject) => {
    try {
      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument();
      const chunks = [];
      
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.fontSize(12).text(text, {
        align: 'left'
      });
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Merge multiple PDFs
 */
const mergePdfs = async (pdfBuffers) => {
  const mergedPdf = await PDFDocument.create();

  for (const pdfBytes of pdfBuffers) {
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
};

module.exports = {
  markdownToHtml,
  htmlToMarkdown,
  htmlToDocx,
  docxToHtml,
  textToPdf,
  mergePdfs
};
