/**
 * adblockerGPT - Popup Script
 */

document.addEventListener('DOMContentLoaded', init);

async function init() {
  await loadSettings();
  setupEventListeners();
}

/**
 * Load settings from storage and update UI
 */
async function loadSettings() {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });

    // Update toggle states
    document.getElementById('enableToggle').checked = response.enabled !== false;
    document.getElementById('badgeToggle').checked = response.showBadge !== false;

    // Update stats
    document.getElementById('adsBlocked').textContent = response.adsBlocked || 0;

    // Update status indicator
    updateStatusIndicator(response.enabled !== false);
  } catch (error) {
    console.error('Error loading settings:', error);
  }
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
    document.getElementById('adsBlocked').textContent = '0';
  });

  // Open options button
  document.getElementById('openOptions').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
}
