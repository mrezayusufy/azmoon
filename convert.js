const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directory containing image files
const inputDir = './frames';
// Output file path
const outputFilePath = path.join('src/constants', 'LOGO.ts');

// Ensure the constants directory exists
fs.mkdirSync('constants', { recursive: true });

// Function to convert buffer to data URL
const bufferToDataURL = (buffer, mimeType) => {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
};

// Read the image files and convert them to base64 data URLs
const convertFilesToBase64 = async () => {
  const files = fs.readdirSync(inputDir).filter(file => /\.(png|jpg|jpeg)$/i.test(file));
  console.log(files)
  const dataUrls = [];

  for (const file of files) {
    const filePath = path.join(inputDir, file);

    // Convert image to AVIF format
    const extractOptions = {
      left: 1400,
      top: 780,
      width: 377,
      height: 300
    }
    console.info("filepath", filePath)
    const avifBuffer = await sharp(filePath).extract(extractOptions).ensureAlpha().avif().toBuffer();
    const dataUrl = bufferToDataURL(avifBuffer, 'image/avif');
    dataUrls.push(dataUrl);
  }

  // Write the data URLs to the output file
  const outputContent = `export const HOST_INTRO: string[] = ${JSON.stringify(dataUrls, null, 2)};\n`;
  fs.writeFileSync(outputFilePath, outputContent);

  console.log(`Base64 image data URLs written to ${outputFilePath}`);
};

convertFilesToBase64().catch(err => {
  console.error('Error converting files:', err);
});
