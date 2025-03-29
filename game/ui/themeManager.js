import { showPopup } from './popupManager.js';
import { initializeSymbols } from '../logic/symbolManagement.js';
import { initializeGame } from '../state/initialization.js';
import { SYMBOL_THEMES } from '../../config.js';

export const loadThemeOptions = () => {
  try {
    const themeSelector = document.getElementById('theme');
    if (!themeSelector) throw new Error('Theme selector element not found');

    // Only initialize options if they don't exist
    if (themeSelector.options.length <= 1) {
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
    }

    // Ensure we only have one change handler
    themeSelector.onchange = (e) => {
      if (e.target.value) {
        handleThemeChange(e.target.value);
      }
    };

    return true;
  } catch (error) {
    console.error('Theme loading error:', error);
    showPopup(`Failed to load themes: ${error.message}`);
    return false;
  }
};

const handleThemeChange = (themeKey) => {
  try {
    if (!SYMBOL_THEMES[themeKey]) {
      throw new Error(`Theme ${themeKey} not found`);
    }

    // Completely reset the game with new theme
    initializeGame(themeKey);
    
    // Show success message
    showPopup(`Theme applied: ${SYMBOL_THEMES[themeKey].name}`, 2000);
  } catch (error) {
    console.error('Theme change error:', error);
    showPopup(`Failed to change theme: ${error.message}`);
  }
};
