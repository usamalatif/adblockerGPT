#!/bin/bash
# Build script for adblockerGPT extension

cd "$(dirname "$0")"

echo "Building adblockerGPT extensions..."

# Clean old builds and folders
rm -rf chrome-extension firefox-extension
rm -f adblockerGPT-chrome.zip adblockerGPT-firefox.zip
mkdir -p chrome-extension firefox-extension

# Build Chrome version (uses manifest.json with service_worker)
echo "Building Chrome version..."
cd cleangpt
zip -r ../chrome-extension/adblockerGPT-chrome.zip . -x "*.DS_Store" -x "manifest.firefox.json" -x "background.firefox.js" -x "Archive.zip"
cd ..
echo "✓ Chrome build: chrome-extension/adblockerGPT-chrome.zip"

# Build Firefox version (swap manifest, files at root of zip)
echo "Building Firefox version..."
cp cleangpt/manifest.json cleangpt/manifest.chrome.json
cp cleangpt/manifest.firefox.json cleangpt/manifest.json
cd cleangpt
zip -r ../firefox-extension/adblockerGPT-firefox.zip . -x "*.DS_Store" -x "manifest.chrome.json" -x "manifest.firefox.json" -x "background.js" -x "Archive.zip"
cd ..
cp cleangpt/manifest.chrome.json cleangpt/manifest.json
rm cleangpt/manifest.chrome.json
echo "✓ Firefox build: firefox-extension/adblockerGPT-firefox.zip"

echo ""
echo "Build complete!"
echo "- Chrome: chrome-extension/adblockerGPT-chrome.zip"
echo "- Firefox: firefox-extension/adblockerGPT-firefox.zip"
