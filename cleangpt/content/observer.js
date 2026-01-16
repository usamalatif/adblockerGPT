/**
 * adblockerGPT - DOM Observer
 * Watches for dynamically loaded ads using MutationObserver
 */

const adblockerGPTObserver = {
  observer: null,
  isEnabled: true,
  debounceTimer: null,
  processedNodes: new WeakSet(),
  config: {
    debounceMs: 50,
    scanDelay: 500
  },

  /**
   * Initialize the observer
   */
  async init() {
    try {
      // Load custom detection rules first
      await this.loadDetectionRules();

      // Load user settings
      await this.loadSettings();

      if (this.isEnabled) {
        this.startObserving();
        this.initialScan();
      }

      // Listen for settings updates
      chrome.runtime.onMessage.addListener((message) => {
        if (message.type === 'SETTINGS_UPDATED') {
          this.handleSettingsUpdate(message.settings);
        }
      });

      console.log('[adblockerGPT] Observer initialized');
    } catch (error) {
      console.error('[adblockerGPT] Init error:', error);
      // Still try to start with defaults
      this.startObserving();
      this.initialScan();
    }
  },

  /**
   * Load detection rules from JSON config
   */
  async loadDetectionRules() {
    try {
      const url = chrome.runtime.getURL('rules/detection-rules.json');
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const config = await response.json();

      // Apply settings
      if (config.settings) {
        this.config.debounceMs = config.settings.debounceMs || 50;
        if (config.settings.logLevel && window.adblockerGPTDetector) {
          window.adblockerGPTDetector.config.logLevel = config.settings.logLevel;
        }
      }

      // Load rules into detector
      if (config.rules && window.adblockerGPTDetector) {
        window.adblockerGPTDetector.loadCustomRules(config.rules);
        console.log('[adblockerGPT] Custom detection rules loaded');
      }

    } catch (error) {
      console.warn('[adblockerGPT] Could not load detection rules:', error.message);
      // Continue with built-in rules
    }
  },

  /**
   * Load settings from storage
   */
  async loadSettings() {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });
      this.isEnabled = response.enabled !== false;
    } catch (error) {
      console.warn('[adblockerGPT] Could not load settings, using defaults');
      this.isEnabled = true;
    }
  },

  /**
   * Handle settings update from background script
   */
  handleSettingsUpdate(settings) {
    const wasEnabled = this.isEnabled;
    this.isEnabled = settings.enabled !== false;

    if (this.isEnabled && !wasEnabled) {
      this.startObserving();
      this.initialScan();
    } else if (!this.isEnabled && wasEnabled) {
      this.stopObserving();
      window.adblockerGPTRemover?.restoreAllAds();
    }
  },

  /**
   * Start observing DOM changes
   */
  startObserving() {
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new MutationObserver((mutations) => {
      this.handleMutations(mutations);
    });

    // Observe the entire document for changes
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id', 'data-testid', 'style', 'data-ad', 'data-sponsored']
    });

    console.log('[adblockerGPT] Observer started');
  },

  /**
   * Stop observing DOM changes
   */
  stopObserving() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    console.log('[adblockerGPT] Observer stopped');
  },

  /**
   * Handle DOM mutations
   */
  handleMutations(mutations) {
    if (!this.isEnabled) return;

    // Debounce to avoid excessive processing
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      const nodesToCheck = new Set();

      for (const mutation of mutations) {
        // Check added nodes
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              nodesToCheck.add(node);
              // Also check descendants
              node.querySelectorAll?.('*').forEach(child => nodesToCheck.add(child));
            }
          });
        }

        // Check attribute changes
        if (mutation.type === 'attributes' && mutation.target) {
          nodesToCheck.add(mutation.target);
          // Re-check this element even if previously processed
          this.processedNodes.delete(mutation.target);
        }
      }

      this.processNodes(Array.from(nodesToCheck));
    }, this.config.debounceMs);
  },

  /**
   * Process nodes for ad detection
   */
  processNodes(nodes) {
    if (!window.adblockerGPTDetector || !window.adblockerGPTRemover) {
      console.warn('[adblockerGPT] Detector or Remover not loaded');
      return;
    }

    let adsFound = 0;

    for (const node of nodes) {
      // Skip already processed nodes
      if (this.processedNodes.has(node)) continue;
      this.processedNodes.add(node);

      if (window.adblockerGPTDetector.isAd(node)) {
        if (window.adblockerGPTRemover.removeAd(node)) {
          adsFound++;
        }
      }
    }

    if (adsFound > 0) {
      console.log(`[adblockerGPT] Blocked ${adsFound} ad(s)`);
    }
  },

  /**
   * Perform initial scan of the page
   */
  initialScan() {
    if (!this.isEnabled) return;

    console.log('[adblockerGPT] Running initial scan...');

    // Wait a bit for page to stabilize
    setTimeout(() => {
      if (window.adblockerGPTDetector) {
        const ads = window.adblockerGPTDetector.scanForAds();
        if (ads.length > 0) {
          window.adblockerGPTRemover?.removeAds(ads);
          console.log(`[adblockerGPT] Initial scan blocked ${ads.length} ad(s)`);
        } else {
          console.log('[adblockerGPT] No ads found in initial scan');
        }
      }
    }, this.config.scanDelay);
  },

  /**
   * Force a rescan of the page
   */
  rescan() {
    this.processedNodes = new WeakSet();
    if (window.adblockerGPTDetector) {
      window.adblockerGPTDetector.resetCache();
    }
    this.initialScan();
  },

  /**
   * Get observer statistics
   */
  getStats() {
    return {
      enabled: this.isEnabled,
      observing: this.observer !== null,
      detectorStats: window.adblockerGPTDetector?.getStats() || {}
    };
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => adblockerGPTObserver.init());
} else {
  adblockerGPTObserver.init();
}

// Export for debugging
window.adblockerGPTObserver = adblockerGPTObserver;
