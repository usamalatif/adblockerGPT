/**
 * adblockerGPT - Popup Script
 */

document.addEventListener('DOMContentLoaded', init);

async function init() {
  await loadSettings();
  setupEventListeners();

  // Track popup opened in analytics
  chrome.runtime.sendMessage({ type: 'POPUP_OPENED' });
}

/**
 * Load settings from storage and update UI
 */
async function loadSettings() {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS_FOR_POPUP' });

    // Update toggle states
    document.getElementById('enableToggle').checked = response.enabled !== false;
    document.getElementById('badgeToggle').checked = response.showBadge !== false;

    // Update stats - current page and total
    document.getElementById('currentPageBlocked').textContent = response.currentPageBlocked || 0;
    document.getElementById('totalAdsBlocked').textContent = formatNumber(response.totalAdsBlocked || 0);

    // Update status indicator
    updateStatusIndicator(response.enabled !== false);
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

/**
 * Format large numbers (e.g., 1000 -> 1K)
 */
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Update the status indicator UI
 */
function updateStatusIndicator(enabled) {
  const indicator = document.getElementById('statusIndicator');
  const statusText = indicator.querySelector('.status-text');

  if (enabled) {
    indicator.classList.remove('disabled');
    statusText.textContent = 'Protection Active';
  } else {
    indicator.classList.add('disabled');
    statusText.textContent = 'Protection Disabled';
  }
}

/**
 * Setup event listeners for UI elements
 */
function setupEventListeners() {
  // Enable toggle
  document.getElementById('enableToggle').addEventListener('change', async (e) => {
    const enabled = e.target.checked;
    await chrome.runtime.sendMessage({
      type: 'UPDATE_SETTINGS',
      settings: { enabled }
    });
    updateStatusIndicator(enabled);
  });

  // Badge toggle
  document.getElementById('badgeToggle').addEventListener('change', async (e) => {
    await chrome.runtime.sendMessage({
      type: 'UPDATE_SETTINGS',
      settings: { showBadge: e.target.checked }
    });
  });

  // Reset stats button
  document.getElementById('resetStats').addEventListener('click', async () => {
    await chrome.runtime.sendMessage({ type: 'RESET_STATS' });
    document.getElementById('currentPageBlocked').textContent = '0';
    document.getElementById('totalAdsBlocked').textContent = '0';
  });

  // Open options button
  document.getElementById('openOptions').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
}
