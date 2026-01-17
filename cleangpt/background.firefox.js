/**
 * adblockerGPT - Background Script (Firefox version)
 * Handles extension state, messaging, and badge updates
 */

// Analytics is loaded before this script via manifest.json background.scripts

// Default settings
const DEFAULT_SETTINGS = {
  enabled: true,
  showBadge: true,
  totalAdsBlocked: 0 // All-time total
};

// Track per-tab ad counts (in memory, resets on page reload)
const tabAdCounts = new Map();

// Initialize extension on install
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    await chrome.storage.local.set(DEFAULT_SETTINGS);
    console.log('adblockerGPT installed successfully');

    // Track installation
    Analytics.init().then(() => {
      Analytics.trackEvent('extension_installed', {
        version: chrome.runtime.getManifest().version
      });
    });
  } else if (details.reason === 'update') {
    console.log('adblockerGPT updated to version', chrome.runtime.getManifest().version);

    // Migrate old adsBlocked to totalAdsBlocked
    const oldData = await chrome.storage.local.get(['adsBlocked']);
    if (oldData.adsBlocked && !oldData.totalAdsBlocked) {
      await chrome.storage.local.set({ totalAdsBlocked: oldData.adsBlocked });
    }

    // Track update
    Analytics.init().then(() => {
      Analytics.trackEvent('extension_updated', {
        version: chrome.runtime.getManifest().version
      });
    });
  }
});

// Initialize analytics on startup
Analytics.init().then(() => {
  Analytics.trackDailyActive();
});

// Clear tab count when tab is updated (page reload/navigation)
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    tabAdCounts.set(tabId, 0);
    // Update badge to 0 for this tab
    chrome.action.setBadgeText({ text: '', tabId });
  }
});

// Clean up when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  tabAdCounts.delete(tabId);
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'AD_BLOCKED') {
    handleAdBlocked(message.count, message.url, sender.tab?.id);
    sendResponse({ success: true });
  } else if (message.type === 'GET_SETTINGS') {
    getSettingsWithTabCount(sender.tab?.id).then(sendResponse);
    return true; // Keep channel open for async response
  } else if (message.type === 'GET_SETTINGS_FOR_POPUP') {
    // Get settings for popup (needs active tab info)
    getSettingsForPopup().then(sendResponse);
    return true;
  } else if (message.type === 'UPDATE_SETTINGS') {
    updateSettings(message.settings).then(sendResponse);
    return true;
  } else if (message.type === 'POPUP_OPENED') {
    Analytics.trackPopupOpened();
    sendResponse({ success: true });
  } else if (message.type === 'RESET_STATS') {
    resetStats().then(sendResponse);
    return true;
  }
});

// Handle ad blocked event
async function handleAdBlocked(count = 1, url = '', tabId) {
  // Update total count
  const settings = await getSettings();
  settings.totalAdsBlocked += count;
  await chrome.storage.local.set({ totalAdsBlocked: settings.totalAdsBlocked });

  // Update per-tab count
  if (tabId) {
    const currentTabCount = tabAdCounts.get(tabId) || 0;
    const newTabCount = currentTabCount + count;
    tabAdCounts.set(tabId, newTabCount);

    // Update badge for this specific tab
    if (settings.showBadge) {
      updateBadge(newTabCount, tabId);
    }
  }

  // Track in analytics
  Analytics.trackAdBlocked(count);

  // Track hostname (for knowing which sites have most ads)
  if (url) {
    try {
      const hostname = new URL(url).hostname;
      Analytics.trackPageBlocked(hostname);
    } catch (e) {}
  }
}

// Update badge with blocked count for specific tab
function updateBadge(count, tabId) {
  const text = count > 999 ? '999+' : count.toString();
  if (tabId) {
    chrome.action.setBadgeText({ text: count > 0 ? text : '', tabId });
  } else {
    chrome.action.setBadgeText({ text: count > 0 ? text : '' });
  }
  chrome.action.setBadgeBackgroundColor({ color: '#10B981' }); // Green
}

// Get current settings
async function getSettings() {
  const settings = await chrome.storage.local.get(DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...settings };
}

// Get settings with tab count
async function getSettingsWithTabCount(tabId) {
  const settings = await getSettings();
  settings.currentPageBlocked = tabId ? (tabAdCounts.get(tabId) || 0) : 0;
  return settings;
}

// Get settings for popup (with active tab count)
async function getSettingsForPopup() {
  const settings = await getSettings();

  // Get active tab
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTabId = tabs[0]?.id;

  settings.currentPageBlocked = activeTabId ? (tabAdCounts.get(activeTabId) || 0) : 0;
  return settings;
}

// Update settings
async function updateSettings(newSettings) {
  await chrome.storage.local.set(newSettings);

  // Track toggle in analytics
  if (typeof newSettings.enabled !== 'undefined') {
    Analytics.trackToggle(newSettings.enabled);
  }

  // Update badge visibility
  if (newSettings.showBadge === false) {
    // Clear badge on all tabs
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      chrome.action.setBadgeText({ text: '', tabId: tab.id });
    }
  } else if (newSettings.showBadge === true) {
    // Restore badges on all tabs
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      const count = tabAdCounts.get(tab.id) || 0;
      if (count > 0) {
        updateBadge(count, tab.id);
      }
    }
  }

  // Notify content scripts of settings change on all tabs
  const tabs = await chrome.tabs.query({});

  for (const tab of tabs) {
    if (tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
      chrome.tabs.sendMessage(tab.id, {
        type: 'SETTINGS_UPDATED',
        settings: newSettings
      }).catch(() => {}); // Ignore errors for inactive tabs
    }
  }

  return { success: true };
}

// Reset stats
async function resetStats() {
  await chrome.storage.local.set({ totalAdsBlocked: 0 });

  // Clear all tab counts
  tabAdCounts.clear();

  // Clear badges on all tabs
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    chrome.action.setBadgeText({ text: '', tabId: tab.id });
  }

  return { success: true };
}
