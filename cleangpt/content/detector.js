/**
 * adblockerGPT - Ad Detection Engine
 * Multi-strategy detection system for ChatGPT ads
 */

const adblockerGPTDetector = {
  // Configuration
  config: {
    debug: false,
    logLevel: 'warn', // 'none', 'warn', 'info', 'debug'
    enabled: true
  },

  // Detection rules
  rules: {
    // Strategy 1: Common ad class/ID indicators
    classPatterns: [
      /\bad\b/i,
      /\bads\b/i,
      /\badvert/i,
      /\bsponsored\b/i,
      /\bpromotion/i,
      /\bpromo\b/i,
      /\bad[-_]?container/i,
      /\bad[-_]?wrapper/i,
      /\bad[-_]?slot/i,
      /\bad[-_]?unit/i,
      /\bad[-_]?label/i,
      /\bad[-_]?banner/i,
      /\bad[-_]?block/i,
      /\bad[-_]?placement/i,
      /\bad[-_]?content/i,
      /\bsponsor[-_]?content/i,
      /\bpaid[-_]?content/i,
      /\bnative[-_]?ad/i,
      /\bdisplay[-_]?ad/i
    ],

    // Strategy 2: Data attribute patterns
    dataAttributes: [
      'data-ad',
      'data-ad-slot',
      'data-ad-client',
      'data-ad-format',
      'data-ad-layout',
      'data-sponsored',
      'data-promotion',
      'data-advertisement',
      'data-ad-unit',
      'data-ad-id',
      'data-native-ad',
      'data-dfp',
      'data-google-query-id'
    ],

    // Strategy 3: Text content indicators (for labels)
    textIndicators: [
      'sponsored',
      'advertisement',
      'ad',
      'promoted',
      'paid partnership',
      'paid promotion',
      'sponsored content',
      'partner content',
      'presented by',
      'brought to you by'
    ],

    // Strategy 4: Structural/CSS selectors
    structuralSelectors: [
      // Generic ad patterns
      '[class*="ad-"]:not([class*="load"]):not([class*="add"]):not([class*="grad"])',
      '[class*="-ad"]:not([class*="load"]):not([class*="head"]):not([class*="read"])',
      '[class*="_ad"]:not([class*="load"])',
      '[class*="ad_"]:not([class*="load"])',
      '[id*="ad-"]:not([id*="load"]):not([id*="add"])',
      '[id*="-ad"]:not([id*="load"]):not([id*="head"])',

      // Data attribute based
      '[data-testid*="ad"]',
      '[data-testid*="sponsor"]',
      '[data-testid*="promo"]',
      '[aria-label*="advertisement"]',
      '[aria-label*="sponsored"]',
      '[role="complementary"][class*="ad"]',

      // Google Ads specific
      'ins.adsbygoogle',
      '.adsbygoogle',
      '[id^="google_ads_"]',
      '[id^="div-gpt-ad"]',
      '[id*="google_ads_iframe"]',
      '[data-ad-client]',
      '[data-ad-slot]',
      'iframe[src*="doubleclick.net"]',
      'iframe[src*="googlesyndication.com"]',
      'iframe[src*="googleadservices.com"]',
      'iframe[src*="googleads.g.doubleclick.net"]',
      'iframe[src*="pagead2.googlesyndication.com"]',
      '[class*="google-ad"]',
      '[class*="GoogleAd"]',
      '[class*="dfp-"]',

      // Amazon Ads
      'iframe[src*="amazon-adsystem"]',
      '[class*="amzn-ad"]',

      // Taboola
      '.taboola-widget',
      '[class*="taboola"]',
      '[id*="taboola"]',
      'iframe[src*="taboola"]',

      // Outbrain
      '.outbrain-widget',
      '[class*="outbrain"]',
      '[id*="outbrain"]',
      'iframe[src*="outbrain"]',

      // Other ad networks
      '[class*="mgid"]',
      '[class*="revcontent"]',
      '[class*="criteo"]',
      '[class*="adnxs"]',
      'iframe[src*="criteo"]',
      'iframe[src*="adnxs"]',

      // Social media ads
      '[class*="sponsored-post"]',
      '[class*="promoted-post"]',
      '[data-promoted="true"]'
    ],

    // Strategy 5: OpenAI/ChatGPT specific patterns (to be updated when ads launch)
    chatgptSelectors: [
      // Placeholder selectors - will be refined when actual ads appear
      '[data-testid*="chatgpt-ad"]',
      '[data-testid*="response-ad"]',
      '[class*="chatgpt-ad"]',
      '[class*="response-ad"]',
      '[class*="conversation-ad"]',
      '[class*="message-ad"]',
      // Bottom of response patterns (OpenAI mentioned ads at bottom)
      '.message-content > [class*="sponsor"]',
      '.message-content > [class*="promo"]',
      '[data-message-author-role="assistant"] [class*="ad-"]'
    ],

    // Exclusion patterns (elements to never block)
    exclusions: [
      /\badd\b/i,        // "add" buttons
      /\bload/i,         // loading states
      /\bhead/i,         // headers
      /\bread/i,         // "read more"
      /\blead/i,         // leading content
      /\bdead/i,         // deadlines etc
      /\bgrad/i,         // gradients
      /\bpad/i,          // padding
      /\bshad/i,         // shadows
      /\bbad/i,          // badges
      /\bdialog/i,       // dialogs
      /\bdownload/i,     // download buttons
      /\bupload/i,       // upload buttons
      /\bthread/i,       // threads
      /\bspread/i        // spreadsheets
    ]
  },

  // Stats tracking
  stats: {
    checked: 0,
    blocked: 0,
    falsePositivesPrevented: 0
  },

  /**
   * Log helper
   */
  log(level, ...args) {
    const levels = { none: 0, warn: 1, info: 2, debug: 3 };
    const currentLevel = levels[this.config.logLevel] || 1;
    const messageLevel = levels[level] || 0;

    if (messageLevel <= currentLevel) {
      const prefix = '[adblockerGPT]';
      if (level === 'warn') console.warn(prefix, ...args);
      else if (level === 'debug') console.debug(prefix, ...args);
      else console.log(prefix, ...args);
    }
  },

  /**
   * Check if element should be excluded (false positive prevention)
   */
  isExcluded(element) {
    const className = element.className?.toString() || '';
    const id = element.id || '';
    const combined = `${className} ${id}`;

    // Check exclusion patterns
    for (const pattern of this.rules.exclusions) {
      if (pattern.test(combined)) {
        // Double-check: if it explicitly has ad-related terms, don't exclude
        if (/advert|sponsor|promo/i.test(combined)) {
          return false;
        }
        this.stats.falsePositivesPrevented++;
        this.log('debug', 'Excluded (false positive prevention):', element);
        return true;
      }
    }

    // Don't block essential ChatGPT UI elements
    const essentialClasses = [
      'prose', 'markdown', 'message', 'conversation',
      'chat', 'input', 'button', 'nav', 'sidebar',
      'modal', 'dropdown', 'menu', 'tooltip'
    ];

    for (const essential of essentialClasses) {
      if (combined.toLowerCase().includes(essential) &&
          !combined.toLowerCase().includes('ad-') &&
          !combined.toLowerCase().includes('-ad') &&
          !combined.toLowerCase().includes('sponsor')) {
        return true;
      }
    }

    return false;
  },

  /**
   * Main detection function
   * @param {Element} element - DOM element to check
   * @returns {boolean} - True if element is an ad
   */
  isAd(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }

    // Skip if already processed
    if (element.dataset.adblockergptChecked) {
      return element.dataset.adblockergptIsAd === 'true';
    }

    this.stats.checked++;

    // Check exclusions first
    if (this.isExcluded(element)) {
      element.dataset.adblockergptChecked = 'true';
      element.dataset.adblockergptIsAd = 'false';
      return false;
    }

    // Run detection strategies
    const detectionResult = {
      classMatch: this.checkClassPatterns(element),
      attrMatch: this.checkDataAttributes(element),
      textMatch: this.checkTextContent(element),
      selectorMatch: this.checkStructuralPatterns(element),
      chatgptMatch: this.checkChatGPTPatterns(element),
      googleAdsMatch: this.checkGoogleAdsPatterns(element),
      visualMatch: this.checkVisualHeuristics(element),
      positionMatch: this.checkPositionBased(element)
    };

    const isAd = Object.values(detectionResult).some(v => v);

    // Mark as processed
    element.dataset.adblockergptChecked = 'true';
    element.dataset.adblockergptIsAd = isAd.toString();

    if (isAd) {
      this.stats.blocked++;
      this.log('info', 'Ad detected:', detectionResult, element);
    }

    return isAd;
  },

  /**
   * Strategy 1: Check class and ID for ad patterns
   */
  checkClassPatterns(element) {
    const className = element.className?.toString() || '';
    const id = element.id || '';
    const combined = `${className} ${id}`;

    return this.rules.classPatterns.some(pattern => pattern.test(combined));
  },

  /**
   * Strategy 2: Check for ad-related data attributes
   */
  checkDataAttributes(element) {
    // Check predefined attributes
    if (this.rules.dataAttributes.some(attr => element.hasAttribute(attr))) {
      return true;
    }

    // Check for any data-* attribute containing ad-related terms
    for (const attr of element.attributes) {
      if (attr.name.startsWith('data-')) {
        const value = `${attr.name} ${attr.value}`.toLowerCase();
        if (/\bad\b|sponsor|promo|advert/.test(value)) {
          return true;
        }
      }
    }

    return false;
  },

  /**
   * Strategy 3: Check text content for ad indicators
   */
  checkTextContent(element) {
    // Only check small elements that might be labels
    if (element.children.length > 3) return false;

    // Get direct text content (not from children)
    let directText = '';
    for (const node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        directText += node.textContent;
      }
    }

    const text = directText.toLowerCase().trim();

    // Must be short text (likely a label)
    if (text.length > 30 || text.length < 2) return false;

    // Check for exact matches or labeled content
    return this.rules.textIndicators.some(indicator => {
      return text === indicator ||
             text === `${indicator}:` ||
             text.startsWith(`${indicator} `) ||
             text.endsWith(` ${indicator}`);
    });
  },

  /**
   * Strategy 4: Check structural patterns using CSS selectors
   */
  checkStructuralPatterns(element) {
    return this.rules.structuralSelectors.some(selector => {
      try {
        return element.matches(selector);
      } catch {
        return false;
      }
    });
  },

  /**
   * Strategy 5: Check ChatGPT-specific patterns
   */
  checkChatGPTPatterns(element) {
    // Only run on ChatGPT domains
    const isChatGPT = window.location.hostname.includes('chatgpt.com') ||
                      window.location.hostname.includes('chat.openai.com');
    if (!isChatGPT) return false;

    return this.rules.chatgptSelectors.some(selector => {
      try {
        return element.matches(selector);
      } catch {
        return false;
      }
    });
  },

  /**
   * Strategy 5b: Check Google Ads patterns
   */
  checkGoogleAdsPatterns(element) {
    // Check for Google AdSense
    if (element.tagName === 'INS' && element.classList.contains('adsbygoogle')) {
      return true;
    }

    // Check for Google Ad iframes
    if (element.tagName === 'IFRAME') {
      const src = element.src || '';
      if (/doubleclick\.net|googlesyndication\.com|googleadservices\.com|googleads\.g\.doubleclick\.net/.test(src)) {
        return true;
      }
    }

    // Check for Google Ad containers
    const id = element.id || '';
    if (/^google_ads_|^div-gpt-ad|google_ads_iframe/.test(id)) {
      return true;
    }

    // Check data attributes
    if (element.hasAttribute('data-ad-client') || element.hasAttribute('data-ad-slot')) {
      return true;
    }

    return false;
  },

  /**
   * Strategy 6: Visual heuristics (styling patterns common in ads)
   */
  checkVisualHeuristics(element) {
    try {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      // Skip tiny or invisible elements
      if (rect.width < 100 || rect.height < 50) return false;
      if (style.display === 'none' || style.visibility === 'hidden') return false;

      // Check for common ad styling patterns
      const hasAdBorder = style.border && /1px|2px/.test(style.border) &&
                          element.textContent?.toLowerCase().includes('sponsor');

      // Check for "Sponsored" label styling (small text at top)
      const hasLabelStyling = rect.height < 30 &&
                              style.fontSize && parseInt(style.fontSize) < 14 &&
                              /sponsor|ad|promo/i.test(element.textContent || '');

      // Check for iframe ads
      if (element.tagName === 'IFRAME') {
        const src = element.src || '';
        if (/ad|sponsor|doubleclick|googlesyndication/.test(src)) {
          return true;
        }
      }

      return hasAdBorder || hasLabelStyling;
    } catch {
      return false;
    }
  },

  /**
   * Strategy 7: Position-based detection (ads at bottom of responses)
   */
  checkPositionBased(element) {
    try {
      // Check if element is at the bottom of a chat message
      const parent = element.closest('[data-message-author-role="assistant"]') ||
                     element.closest('.message') ||
                     element.closest('[class*="response"]');

      if (!parent) return false;

      // Check if this element is near the bottom of the parent
      const parentRect = parent.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const isNearBottom = (parentRect.bottom - elementRect.bottom) < 50;
      const hasAdIndicator = /ad|sponsor|promo/i.test(
        element.className + ' ' + element.id + ' ' + (element.textContent || '').slice(0, 50)
      );

      return isNearBottom && hasAdIndicator;
    } catch {
      return false;
    }
  },

  /**
   * Scan document for all potential ads
   * @returns {Element[]} - Array of detected ad elements
   */
  scanForAds() {
    const potentialAds = [];
    const allSelectors = [
      ...this.rules.structuralSelectors,
      ...this.rules.chatgptSelectors
    ];

    // Query using all selectors
    for (const selector of allSelectors) {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (this.isAd(el) && !potentialAds.includes(el)) {
            potentialAds.push(el);
          }
        });
      } catch {
        // Invalid selector, skip
      }
    }

    // Also scan elements with suspicious attributes
    const attrSelectors = this.rules.dataAttributes.map(attr => `[${attr}]`).join(',');
    try {
      document.querySelectorAll(attrSelectors).forEach(el => {
        if (this.isAd(el) && !potentialAds.includes(el)) {
          potentialAds.push(el);
        }
      });
    } catch {}

    this.log('info', `Scan complete. Found ${potentialAds.length} ads.`);
    return potentialAds;
  },

  /**
   * Load custom rules from JSON config
   */
  loadCustomRules(customRules) {
    if (!customRules) return;

    if (customRules.classPatterns) {
      const newPatterns = customRules.classPatterns.map(p => {
        try { return new RegExp(p, 'i'); }
        catch { return null; }
      }).filter(Boolean);
      this.rules.classPatterns.push(...newPatterns);
    }

    if (customRules.dataAttributes) {
      this.rules.dataAttributes.push(...customRules.dataAttributes);
    }

    if (customRules.structuralSelectors) {
      this.rules.structuralSelectors.push(...customRules.structuralSelectors);
    }

    if (customRules.chatgptSelectors) {
      this.rules.chatgptSelectors.push(...customRules.chatgptSelectors);
    }

    if (customRules.textIndicators) {
      this.rules.textIndicators.push(...customRules.textIndicators);
    }

    if (customRules.exclusions) {
      const newExclusions = customRules.exclusions.map(p => {
        try { return new RegExp(p, 'i'); }
        catch { return null; }
      }).filter(Boolean);
      this.rules.exclusions.push(...newExclusions);
    }

    this.log('info', 'Custom rules loaded');
  },

  /**
   * Add a single detection rule dynamically
   */
  addRule(type, rule) {
    switch (type) {
      case 'class':
        this.rules.classPatterns.push(new RegExp(rule, 'i'));
        break;
      case 'attr':
        this.rules.dataAttributes.push(rule);
        break;
      case 'selector':
        this.rules.structuralSelectors.push(rule);
        break;
      case 'chatgpt':
        this.rules.chatgptSelectors.push(rule);
        break;
      case 'text':
        this.rules.textIndicators.push(rule.toLowerCase());
        break;
      case 'exclude':
        this.rules.exclusions.push(new RegExp(rule, 'i'));
        break;
    }
    this.log('debug', `Rule added: ${type} - ${rule}`);
  },

  /**
   * Reset element check cache (useful after DOM changes)
   */
  resetCache() {
    document.querySelectorAll('[data-adblockergpt-checked]').forEach(el => {
      delete el.dataset.adblockergptChecked;
      delete el.dataset.adblockergptIsAd;
    });
    this.log('debug', 'Cache reset');
  },

  /**
   * Get detection statistics
   */
  getStats() {
    return { ...this.stats };
  },

  /**
   * Enable/disable debug mode
   */
  setDebug(enabled) {
    this.config.debug = enabled;
    this.config.logLevel = enabled ? 'debug' : 'warn';
  }
};

// Export for use in other content scripts
window.adblockerGPTDetector = adblockerGPTDetector;
