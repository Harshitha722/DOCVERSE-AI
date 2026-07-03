const { textToPdf } = require('./services/conversionService');

async function testPdf() {
  try {
    const text = 'Hello world! Here are some "smart quotes" and an em—dash.';
    const buffer = await textToPdf(text);
    console.log('Success! Buffer size:', buffer.length);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testPdf();
