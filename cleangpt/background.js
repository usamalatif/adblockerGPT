/**
 * adblockerGPT - Background Service Worker
 * Handles extension state, messaging, and badge updates
 */

// Default settings
const DEFAULT_SETTINGS = {
  enabled: true,
  showBadge: true,
  adsBlocked: 0
};

// Initialize extension on install
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    await chrome.storage.local.set(DEFAULT_SETTINGS);
    console.log('adblockerGPT installed successfully');
  } else if (details.reason === 'update') {
    console.log('adblockerGPT updated to version', chrome.runtime.getManifest().version);
  }
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'AD_BLOCKED') {
    handleAdBlocked(message.count);
    sendResponse({ success: true });
  } else if (message.type === 'GET_SETTINGS') {
    getSettings().then(sendResponse);
    return true; // Keep channel open for async response
  } else if (message.type === 'UPDATE_SETTINGS') {
    updateSettings(message.settings).then(sendResponse);
    return true;
  }
});

// Handle ad blocked event
async function handleAdBlocked(count = 1) {
  const settings = await getSettings();
  settings.adsBlocked += count;
  await chrome.storage.local.set({ adsBlocked: settings.adsBlocked });

  if (settings.showBadge) {
    updateBadge(settings.adsBlocked);
  }
}

// Update badge with blocked count
function updateBadge(count) {
  const text = count > 999 ? '999+' : count.toString();
  chrome.action.setBadgeText({ text: count > 0 ? text : '' });
  chrome.action.setBadgeBackgroundColor({ color: '#10B981' }); // Green
}

// Get current settings
async function getSettings() {
  const settings = await chrome.storage.local.get(DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...settings };
}

// Update settings
async function updateSettings(newSettings) {
  await chrome.storage.local.set(newSettings);

  // Update badge visibility
  if (newSettings.showBadge === false) {
    chrome.action.setBadgeText({ text: '' });
  } else if (newSettings.showBadge === true) {
    const settings = await getSettings();
    updateBadge(settings.adsBlocked);
  }

  // Notify content scripts of settings change
  const tabs = await chrome.tabs.query({
    url: ['https://chat.openai.com/*', 'https://chatgpt.com/*']
  });

  for (const tab of tabs) {
    chrome.tabs.sendMessage(tab.id, {
      type: 'SETTINGS_UPDATED',
      settings: newSettings
    }).catch(() => {}); // Ignore errors for inactive tabs
  }

  return { success: true };
}

// Reset stats
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'RESET_STATS') {
    chrome.storage.local.set({ adsBlocked: 0 }).then(() => {
      chrome.action.setBadgeText({ text: '' });
      sendResponse({ success: true });
    });
    return true;
  }
});
