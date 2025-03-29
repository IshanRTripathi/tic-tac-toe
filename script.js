import { initializeGame } from './game/state/initialization.js';
import './styles/base.css';
import './styles/symbols.css';
import './styles/board.css';
import './styles/buttons.css';
import './styles/popups.css';
import { loadThemeOptions } from './game/ui/themeManager.js';

// Initialize game managers/dev tools
import { createConsoleToPopup } from './utils/consoleToPopup.js';
import { showPopup } from './game/ui/popupManager.js';

// Initialize debug mode popup logging
if (process.env.NODE_ENV === 'development') {
  const consoleToPopup = createConsoleToPopup(showPopup);
}

// Main game initialization
document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('Initializing game...'); // Debug log
    
    // Load theme options first
    await loadThemeOptions();
    
    // Then initialize game with default theme
    initializeGame();
    
    // Theme selector event delegation
    document.body.addEventListener('change', (e) => {
      if (e.target.classList.contains('theme-selector')) {
        console.log('Theme changed to:', e.target.value); // Debug log
        initializeGame(e.target.value);
      }
    });
    
  } catch (error) {
    console.error('Game initialization failed:', error);
    showPopup(`Initialization error: ${error.message}`);
  }
});
