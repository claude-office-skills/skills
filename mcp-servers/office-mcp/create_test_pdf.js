#!/usr/bin/env node

/**
 * Create a simple test PDF for office-mcp testing
 * Run: node create_test_pdf.js
 */

const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createTestPDF() {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Add a page
  const page = pdfDoc.addPage([600, 400]);
  
  // Embed font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Draw title
  page.drawText('Test PDF for Office MCP', {
    x: 50,
    y: 350,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  // Draw content
  const content = [
    '',
    'This is a test PDF created to verify PDF extraction functionality.',
    '',
    'Features to test:',
    '• Text extraction',
    '• Metadata reading',
    '• PDF merging',
    '• PDF splitting',
    '• Watermark addition',
    '',
    'Created by: Office MCP Test Suite',
    'Date: ' + new Date().toISOString().split('T')[0],
    'Page: 1 of 2',
  ];
  
  let yPosition = 310;
  content.forEach((line) => {
    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
  });
  
  // Add second page
  const page2 = pdfDoc.addPage([600, 400]);
  
  page2.drawText('Page 2 - Additional Content', {
    x: 50,
    y: 350,
    size: 18,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  page2.drawText('This is the second page of the test PDF.', {
    x: 50,
    y: 310,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });
  
  page2.drawText('You can test split functionality by extracting just this page.', {
    x: 50,
    y: 290,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });
  
  // Set metadata
  pdfDoc.setTitle('Office MCP Test PDF');
  pdfDoc.setAuthor('Claude Office Skills');
  pdfDoc.setSubject('Test Document for MCP PDF Tools');
  pdfDoc.setCreator('office-mcp test suite');
  pdfDoc.setProducer('pdf-lib');
  pdfDoc.setCreationDate(new Date());
  pdfDoc.setModificationDate(new Date());
  
  // Save PDF
  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, 'test_sample.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  
  console.log('✅ Test PDF created successfully!');
  console.log('📄 Location:', outputPath);
  console.log('📊 Pages: 2');
  console.log('📏 Size:', (pdfBytes.length / 1024).toFixed(2), 'KB');
  console.log('');
  console.log('Now you can test in Claude Desktop:');
  console.log('1. Upload this PDF');
  console.log('2. Ask: "帮我提取这个PDF的文本"');
  console.log('3. Check if extract_text_from_pdf is called');
}

// Run
createTestPDF().catch(console.error);
