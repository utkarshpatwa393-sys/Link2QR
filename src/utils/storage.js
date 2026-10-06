const HISTORY_STORAGE_KEY = 'link2qr_recent_history';
const THEME_STORAGE_KEY = 'link2qr_theme_preference';
const MAX_HISTORY_ITEMS = 5;

/**
 * Load history from localStorage safely
 */
export function getStoredHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_HISTORY_ITEMS) : [];
  } catch (err) {
    console.error('Failed to load history from localStorage:', err);
    return [];
  }
}

/**
 * Save an item to history, keeping max 5 recent unique URLs
 */
export function saveToHistory(url, color = '#0f172a') {
  try {
    const current = getStoredHistory();
    // Filter out existing identical URL to push it to the front (most recent)
    const filtered = current.filter((item) => item.url !== url);
    const newItem = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      url,
      color,
      createdAt: new Date().toISOString()
    };
    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save history to localStorage:', err);
    return getStoredHistory();
  }
}

/**
 * Remove a single history item by id
 */
export function removeHistoryItem(id) {
  try {
    const current = getStoredHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete history item:', err);
    return getStoredHistory();
  }
}

/**
 * Clear all history items
 */
export function clearAllHistory() {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    return [];
  } catch (err) {
    console.error('Failed to clear history from localStorage:', err);
    return [];
  }
}

/**
 * Get initial theme preference
 */
export function getStoredTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  } catch {
    return 'light';
  }
}

/**
 * Save theme preference
 */
export function saveThemePreference(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    console.error('Failed to save theme preference:', err);
  }
}
