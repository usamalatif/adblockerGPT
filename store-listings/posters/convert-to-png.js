const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const posters = [
  { file: 'promo-small-440x280.html', width: 440, height: 280 },
  { file: 'promo-large-920x680.html', width: 920, height: 680 },
  { file: 'promo-marquee-1400x560.html', width: 1400, height: 560 },
  { file: 'firefox-header-680x280.html', width: 680, height: 280 },
  { file: 'og-image-1200x630.html', width: 1200, height: 630 },
  { file: 'twitter-header-1500x500.html', width: 1500, height: 500 },
];

async function convertToPNG() {
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  // Create output directory if it doesn't exist
  const outputDir = path.join(__dirname, 'png');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const poster of posters) {
    console.log(`Converting ${poster.file}...`);

    const page = await browser.newPage();

    // Set viewport to exact dimensions
    await page.setViewport({
      width: poster.width,
      height: poster.height,
      deviceScaleFactor: 2, // 2x for high DPI/retina quality
    });

    // Load the HTML file
    const filePath = path.join(__dirname, poster.file);
    await page.goto(`file://${filePath}`, {
      waitUntil: 'networkidle0', // Wait for fonts to load
    });

    // Wait a bit more for fonts to fully render
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Take screenshot
    const outputName = poster.file.replace('.html', '.png');
    const outputPath = path.join(outputDir, outputName);

    await page.screenshot({
      path: outputPath,
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: poster.width,
        height: poster.height,
      },
    });

    console.log(`  ✓ Saved to png/${outputName}`);
    await page.close();
  }

  await browser.close();
  console.log('\nAll posters converted successfully!');
}

convertToPNG().catch(console.error);
