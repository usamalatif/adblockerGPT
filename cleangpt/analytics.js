/**
 * adblockerGPT - Google Analytics 4 Integration
 * Uses Measurement Protocol for extension tracking
 */

const Analytics = {
  // Your GA4 Measurement ID and API Secret
  MEASUREMENT_ID: 'G-XTYYET126Z',
  API_SECRET: 'qwWN6LjOQU2jCMpgh1X8Fw', // You'll need to create this in GA4 Admin > Data Streams > Measurement Protocol API secrets

  // Endpoint for GA4 Measurement Protocol
  ENDPOINT: 'https://www.google-analytics.com/mp/collect',

  // Client ID (unique per installation)
  clientId: null,

  /**
   * Initialize analytics - get or create client ID
   */
  async init() {
    try {
      const data = await chrome.storage.local.get(['analyticsClientId', 'installDate']);

      if (data.analyticsClientId) {
        this.clientId = data.analyticsClientId;
      } else {
        // Generate a new client ID for this installation
        this.clientId = this.generateClientId();
        const installDate = new Date().toISOString();

        await chrome.storage.local.set({
          analyticsClientId: this.clientId,
          installDate: installDate
        });

        // Track new installation
        this.trackEvent('extension_installed', {
          version: chrome.runtime.getManifest().version
        });
      }

      console.log('[adblockerGPT Analytics] Initialized');
    } catch (error) {
      console.warn('[adblockerGPT Analytics] Init error:', error);
    }
  },

  /**
   * Generate a unique client ID
   */
  generateClientId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  /**
   * Send event to Google Analytics 4
   */
  async trackEvent(eventName, params = {}) {
    if (!this.clientId) {
      await this.init();
    }

    // If no API secret is set, skip sending (user needs to configure it)
    if (!this.API_SECRET) {
      console.log('[adblockerGPT Analytics] Event logged locally:', eventName, params);
      return;
    }

    try {
      const payload = {
        client_id: this.clientId,
        events: [{
          name: eventName,
          params: {
            ...params,
            engagement_time_msec: 1,
            session_id: Date.now().toString()
          }
        }]
      };

      const url = `${this.ENDPOINT}?measurement_id=${this.MEASUREMENT_ID}&api_secret=${this.API_SECRET}`;

      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('[adblockerGPT Analytics] Event sent:', eventName);
    } catch (error) {
      console.warn('[adblockerGPT Analytics] Error sending event:', error);
    }
  },

  /**
   * Track extension being enabled/disabled
   */
  trackToggle(enabled) {
    this.trackEvent('extension_toggled', {
      enabled: enabled ? 'true' : 'false'
    });
  },

  /**
   * Track ads blocked (batched to avoid too many events)
   */
  adsBlockedBuffer: 0,
  adsBlockedTimer: null,

  trackAdBlocked(count = 1) {
    this.adsBlockedBuffer += count;

    // Batch ad blocked events - send every 30 seconds or when buffer reaches 10
    if (!this.adsBlockedTimer) {
      this.adsBlockedTimer = setTimeout(() => {
        if (this.adsBlockedBuffer > 0) {
          this.trackEvent('ads_blocked', {
            count: this.adsBlockedBuffer
          });
          this.adsBlockedBuffer = 0;
        }
        this.adsBlockedTimer = null;
      }, 30000);
    }

    if (this.adsBlockedBuffer >= 10) {
      clearTimeout(this.adsBlockedTimer);
      this.trackEvent('ads_blocked', {
        count: this.adsBlockedBuffer
      });
      this.adsBlockedBuffer = 0;
      this.adsBlockedTimer = null;
    }
  },

  /**
   * Track popup opened
   */
  trackPopupOpened() {
    this.trackEvent('popup_opened');
  },

  /**
   * Track page where ads were blocked
   */
  trackPageBlocked(hostname) {
    this.trackEvent('page_blocked', {
      hostname: hostname
    });
  },

  /**
   * Track daily active user (call once per day)
   */
  async trackDailyActive() {
    try {
      const data = await chrome.storage.local.get(['lastActiveDate']);
      const today = new Date().toISOString().split('T')[0];

      if (data.lastActiveDate !== today) {
        await chrome.storage.local.set({ lastActiveDate: today });
        this.trackEvent('daily_active_user', {
          date: today
        });
      }
    } catch (error) {
      console.warn('[adblockerGPT Analytics] Error tracking DAU:', error);
    }
  }
};

// Export for ES modules (Chrome), also available globally (Firefox)
export default Analytics;
