# adblockerGPT

> Block ads on ChatGPT and all websites. Free, lightweight, and privacy-focused.

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-green?logo=googlechrome)](https://www.adblockergpt.com)
[![Firefox Add-ons](https://img.shields.io/badge/Firefox-Add--on-orange?logo=firefox)](https://www.adblockergpt.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![adblockerGPT Banner](https://www.adblockergpt.com/og-image.png)

## What is adblockerGPT?

adblockerGPT is a free browser extension that removes ads and sponsored content from ChatGPT and all websites. It's lightweight, privacy-focused, and works on Chrome, Firefox, Edge, and Brave.

## Features

- **Block ChatGPT Ads** - Remove sponsored messages and promotional banners from ChatGPT
- **Universal Ad Blocking** - Block Google Ads, Taboola, Outbrain, and other ad networks on all websites
- **Real-time Counter** - See how many ads are blocked on each page
- **Privacy-First** - No browsing data collected, no tracking
- **Lightweight** - Only ~35KB, no performance impact
- **Easy Toggle** - One-click enable/disable
- **100% Free** - No premium version, no hidden costs

## Installation

### Chrome / Edge / Brave
1. Visit the [Chrome Web Store](https://www.adblockergpt.com)
2. Click "Add to Chrome"
3. Done! The extension icon will appear in your toolbar

### Firefox
1. Visit [Firefox Add-ons](https://www.adblockergpt.com)
2. Click "Add to Firefox"
3. Done!

## How It Works

adblockerGPT uses intelligent pattern matching to detect and hide ad elements:

1. **Content Detection** - Identifies ad containers, sponsored content, and promotional banners
2. **Real-time Blocking** - Uses MutationObserver to catch dynamically loaded ads
3. **Smart Filtering** - Prioritizes ChatGPT-specific rules while supporting all websites

```
┌─────────────────────────────────────────────┐
│  Website loads                              │
│       ↓                                     │
│  Content scripts inject                     │
│       ↓                                     │
│  Detector scans for ad patterns             │
│       ↓                                     │
│  Ads hidden instantly                       │
│       ↓                                     │
│  Counter updates in badge                   │
└─────────────────────────────────────────────┘
```

## Supported Ad Networks

- Google AdSense
- Google DoubleClick
- Google Publisher Tags (GPT)
- Taboola
- Outbrain
- Generic ad containers and iframes

## Privacy

**We respect your privacy:**

- No personal data collection
- No browsing history tracking
- No ChatGPT conversation monitoring
- All ad blocking happens locally in your browser
- Anonymous usage analytics only (install count, daily active users)

Read our full [Privacy Policy](https://www.adblockergpt.com/privacy)

## Tech Stack

- **Manifest Version:** V3 (latest Chrome extension standard)
- **Languages:** JavaScript, HTML, CSS
- **Permissions:** `storage`, `activeTab`, `host_permissions`

## Project Structure

```
cleangpt/
├── manifest.json           # Chrome manifest
├── manifest.firefox.json   # Firefox manifest
├── background.js           # Service worker (Chrome)
├── background.firefox.js   # Background script (Firefox)
├── analytics.js            # Anonymous usage tracking
├── content/
│   ├── detector.js         # Ad detection logic
│   ├── remover.js          # Ad removal/hiding
│   ├── observer.js         # MutationObserver setup
│   └── styles.css          # Injection styles
├── popup/
│   ├── popup.html          # Extension popup UI
│   ├── popup.js            # Popup logic
│   └── popup.css           # Popup styles
├── options/
│   ├── options.html        # Settings page
│   ├── options.js          # Settings logic
│   └── options.css         # Settings styles
├── icons/                  # Extension icons
└── rules/
    └── detection-rules.json # Ad detection patterns
```

## Building from Source

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/adblockerGPT.git
cd adblockerGPT

# Build for Chrome and Firefox
./build.sh

# Output:
# - chrome-extension/adblockerGPT-chrome.zip
# - firefox-extension/adblockerGPT-firefox.zip
```

### Load Unpacked (Development)

**Chrome:**
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `cleangpt` folder

**Firefox:**
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `cleangpt/manifest.json`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Website:** [adblockergpt.com](https://www.adblockergpt.com)
- **Twitter/X:** [@OrdinaryWeb3Dev](https://x.com/OrdinaryWeb3Dev)
- **Issues:** [GitHub Issues](https://github.com/YOUR_USERNAME/adblockerGPT/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all users who provide feedback
- Inspired by the need for a cleaner ChatGPT experience

---

**If you find adblockerGPT useful, please consider:**
- Giving this repo a ⭐
- Sharing with friends
- [Buy me a coffee](https://buymeacoffee.com/ordinarykai)

Made with ❤️ by [OrdinaryWeb3Dev](https://x.com/OrdinaryWeb3Dev)
