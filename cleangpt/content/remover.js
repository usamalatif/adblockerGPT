/**
 * adblockerGPT - Ad Remover
 * Handles removal/hiding of detected ad elements
 */

const adblockerGPTRemover = {
  // Track removed ads
  removedCount: 0,
  removedElements: new WeakSet(),

  /**
   * Remove or hide an ad element
   * @param {Element} element - The ad element to remove
   * @param {string} action - 'remove' or 'hide'
   * @returns {boolean} - True if element was handled
   */
  removeAd(element, action = 'hide') {
    if (!element || this.removedElements.has(element)) {
      return false;
    }

    try {
      if (action === 'remove') {
        element.remove();
      } else {
        // Hide with CSS (safer, can be undone)
        element.style.setProperty('display', 'none', 'important');
        element.style.setProperty('visibility', 'hidden', 'important');
        element.style.setProperty('height', '0', 'important');
        element.style.setProperty('overflow', 'hidden', 'important');
        element.classList.add('adblockergpt-hidden');
      }

      this.removedElements.add(element);
      this.removedCount++;

      // Notify background script
      this.notifyAdBlocked();

      console.log('[adblockerGPT] Ad blocked:', element);
      return true;
    } catch (error) {
      console.error('[adblockerGPT] Error removing ad:', error);
      return false;
    }
  },

  /**
   * Process multiple ad elements
   * @param {Element[]} elements - Array of ad elements
   * @returns {number} - Number of ads removed
   */
  removeAds(elements) {
    let count = 0;
    for (const element of elements) {
      if (this.removeAd(element)) {
        count++;
      }
    }
    return count;
  },

  /**
   * Restore a hidden ad (for debugging/testing)
   * @param {Element} element - The hidden element to restore
   */
  restoreAd(element) {
    if (!element) return;

    element.style.removeProperty('display');
    element.style.removeProperty('visibility');
    element.style.removeProperty('height');
    element.style.removeProperty('overflow');
    element.classList.remove('adblockergpt-hidden');
    element.dataset.adblockergptChecked = '';
    element.dataset.adblockergptIsAd = '';
  },

  /**
   * Restore all hidden ads
   */
  restoreAllAds() {
    const hidden = document.querySelectorAll('.adblockergpt-hidden');
    hidden.forEach(el => this.restoreAd(el));
    this.removedCount = 0;
    console.log('[adblockerGPT] All ads restored');
  },

  /**
   * Send message to background script about blocked ad
   */
  notifyAdBlocked() {
    try {
      chrome.runtime.sendMessage({
        type: 'AD_BLOCKED',
        count: 1,
        url: window.location.href,
        timestamp: Date.now()
      });
    } catch (error) {
      // Extension context might be invalid
      console.warn('[adblockerGPT] Could not notify background:', error);
    }
  },

  /**
   * Get count of removed ads in current session
   * @returns {number}
   */
  getCount() {
    return this.removedCount;
  },

  /**
   * Reset the counter
   */
  resetCount() {
    this.removedCount = 0;
  }
};

// Export for use in other content scripts
window.adblockerGPTRemover = adblockerGPTRemover;
