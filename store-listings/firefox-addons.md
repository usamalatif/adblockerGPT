# Firefox Add-ons Listing

## Add-on Name
adblockerGPT - Ad-Free ChatGPT

## Summary (250 characters max)
Block ads on ChatGPT instantly. Free, lightweight ad blocker that removes all advertisements and sponsored content from ChatGPT. Zero data collection, 100% privacy focused.

## Description

**Remove All Ads from ChatGPT - 100% Free**

adblockerGPT is a free, lightweight Firefox add-on that blocks advertisements and sponsored content on ChatGPT. Enjoy a clean, distraction-free AI experience without interruptions.

---

**Why adblockerGPT?**

ChatGPT now displays ads to free-tier users. These advertisements appear as product recommendation cards, sponsored suggestions, and promotional content that interrupt your workflow. adblockerGPT removes all of these instantly.

---

**Key Features:**

- Blocks all ChatGPT ad formats (product cards, banners, sponsored content)
- Ultra-lightweight (under 50KB) - no impact on browser performance
- Zero data collection - we never track, store, or transmit your data
- Works automatically - no configuration needed
- Updates regularly to catch new ad patterns
- Completely free - no premium tiers, no subscriptions

---

**Privacy First:**

Unlike other extensions, adblockerGPT collects absolutely no user data:

- No browsing history tracked
- No ChatGPT conversations stored
- No personal information collected
- No analytics or telemetry
- All processing happens locally in your browser

---

**How It Works:**

1. Install the add-on (one click)
2. Visit ChatGPT (chat.openai.com or chatgpt.com)
3. Enjoy ad-free conversations

The add-on activates automatically when you visit ChatGPT. It uses advanced pattern detection to identify and remove advertisement elements before they're displayed.

---

**Permissions Explained:**

We request only the minimum permissions necessary:

- activeTab: To detect when you're on ChatGPT
- storage: To save your preferences locally
- Host permissions: Only for chat.openai.com and chatgpt.com

---

**FAQ:**

**Q: Is adblockerGPT really free?**
A: Yes, completely free. No premium version, no subscriptions, no hidden costs.

**Q: Does it work with ChatGPT Plus?**
A: Yes, it works with both free and Plus accounts.

**Q: Will it slow down my browser?**
A: No. At under 50KB, it has virtually zero impact on performance.

**Q: Do you collect any data?**
A: No. We have a strict zero data collection policy.

---

**Support:**

Website: https://www.adblockergpt.com
Twitter: @OrdinaryWeb3Dev

---

**Note:** adblockerGPT is an independent project and is not affiliated with OpenAI or ChatGPT.

---

## Categories
- Privacy & Security
- Web Development (secondary)

## Tags
chatgpt, ad blocker, remove ads, openai, privacy, free, productivity, clean, no ads, distraction-free

## Screenshots Needed (At least 1, recommended 3-5)

**Screenshot 1:** Before/After comparison showing ChatGPT with and without ads
**Screenshot 2:** Extension popup showing blocked ads counter
**Screenshot 3:** Clean ChatGPT interface with no ads visible
**Screenshot 4:** Options page showing privacy settings

## Icon
- 48x48 PNG (required)
- 96x96 PNG (recommended)
- 128x128 PNG (recommended)

Already have these in: cleangpt/icons/

## Homepage
https://www.adblockergpt.com

## Support URL
https://www.adblockergpt.com/contact

## Support Email
(Use Twitter DM: @OrdinaryWeb3Dev)

## Privacy Policy
https://www.adblockergpt.com/privacy

## License
All Rights Reserved (or specify your license)

## Version Notes (for v1.0.0)

**Initial Release - v1.0.0**

- Block all ChatGPT advertisement formats
- 7-strategy ad detection engine
- Zero data collection
- Ultra-lightweight design (under 50KB)
- Automatic activation on ChatGPT pages
- Support for chat.openai.com and chatgpt.com

---

## Additional Firefox-Specific Notes

### Manifest V2 vs V3
Firefox supports both Manifest V2 and V3. Your current manifest.json uses V3, which is supported. However, if you want maximum compatibility, you may want to also prepare a V2 version.

### Firefox-Specific Manifest Changes (if needed)
If you encounter issues, you may need to add:

```json
"browser_specific_settings": {
  "gecko": {
    "id": "adblockergpt@adblockergpt.com",
    "strict_min_version": "109.0"
  }
}
```

Add this to manifest.json for Firefox submission.
