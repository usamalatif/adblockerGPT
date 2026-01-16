/**
 * adblockerGPT - Options Page Script
 */

document.addEventListener('DOMContentLoaded', init);

async function init() {
  await loadSettings();
  setupEventListeners();
  displayVersion();
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
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

/**
 * Display extension version
 */
function displayVersion() {
  const manifest = chrome.runtime.getManifest();
  document.getElementById('version').textContent = manifest.version;
}

/**
 * Setup event listeners for UI elements
 */
function setupEventListeners() {
  // Enable toggle
  document.getElementById('enableToggle').addEventListener('change', async (e) => {
    await updateSetting({ enabled: e.target.checked });
  });

  // Badge toggle
  document.getElementById('badgeToggle').addEventListener('change', async (e) => {
    await updateSetting({ showBadge: e.target.checked });
  });

  // Reset stats button
  document.getElementById('resetStats').addEventListener('click', async () => {
    await chrome.runtime.sendMessage({ type: 'RESET_STATS' });
    document.getElementById('adsBlocked').textContent = '0';
    showToast('Statistics reset');
  });
}

/**
 * Update a setting and show toast
 */
async function updateSetting(settings) {
  try {
    await chrome.runtime.sendMessage({
      type: 'UPDATE_SETTINGS',
      settings
    });
    showToast('Settings saved');
  } catch (error) {
    console.error('Error updating settings:', error);
    showToast('Error saving settings');
  }
}

/**
 * Show toast notification
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = toast.querySelector('.toast-message');

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}
