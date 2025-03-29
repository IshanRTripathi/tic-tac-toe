import { showPopup } from './popupManager.js';
import { initializeSymbols } from '../logic/symbolManagement.js';
import { createInitialState } from '../state/gameState.js';
import { SYMBOL_THEMES } from '../../config.js';

export const loadThemeOptions = () => {
  try {
    const themeSelector = document.getElementById('theme');
    if (!themeSelector) throw new Error('Theme selector element not found');

    // Clear existing options
    themeSelector.innerHTML = '';

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a theme';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    themeSelector.appendChild(defaultOption);

    // Add theme options from config
    Object.entries(SYMBOL_THEMES).forEach(([themeKey, theme]) => {
      const option = document.createElement('option');
      option.value = themeKey;
      option.textContent = theme.name;
      themeSelector.appendChild(option);
    });

    // Add change handler
    themeSelector.addEventListener('change', (e) => {
      if (e.target.value) {
        applyTheme(e.target.value);
      }
    });

    return true;
  } catch (error) {
    console.error('Theme loading error:', error);
    showPopup(`Failed to load themes: ${error.message}`);
    return false;
  }
};

const applyTheme = (themeKey) => {
  try {
    if (!SYMBOL_THEMES[themeKey]) {
      throw new Error(`Theme ${themeKey} not found`);
    }

    // Reinitialize symbols with new theme
    initializeSymbols(themeKey);
    
    // Update game state with new theme
    const cells = Array(9).fill(null);
    const message = `Theme changed to ${SYMBOL_THEMES[themeKey].name}`;
    createInitialState(cells, message, themeKey);
    
    // Show success message
    showPopup(`Theme applied: ${SYMBOL_THEMES[themeKey].name}`, 2000);
  } catch (error) {
    console.error('Theme application error:', error);
    showPopup(`Failed to apply theme: ${error.message}`);
  }
};

// Keep the existing setupThemeSwitcher function if needed elsewhere
export const setupThemeSwitcher = (selectElement, callback) => {
  selectElement.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    if (SYMBOL_THEMES[selectedTheme]) {
      showPopup(`Theme changed to ${selectedTheme}`, 'success');
      callback(selectedTheme);
    } else {
      showPopup('Invalid theme selected', 'error');
    }
  });
};
