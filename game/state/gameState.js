import { SYMBOL_THEMES } from '../../config.js';

export const createInitialState = (cells, message, theme = 'XO') => {
  const themeConfig = SYMBOL_THEMES[theme] || SYMBOL_THEMES.XO;
  
  return {
    cells: cells,
    message: message,
    gameActive: true,
    currentPlayer: themeConfig.symbols.player1,
    player1Symbol: themeConfig.symbols.player1,
    player2Symbol: themeConfig.symbols.player2,
    player1Count: 6, // Updated to 6 symbols (2 units each of weights 1, 2, 3)
    player2Count: 6, // Updated to 6 symbols (2 units each of weights 1, 2, 3)
    xCount: 6, // Keeping for backward compatibility
    oCount: 6, // Keeping for backward compatibility
    currentTheme: theme,
    showPopup: (msg) => {
      try {
        const popupManager = require('../ui/popupManager.js');
        popupManager.showPopup(msg);
      } catch (error) {
        console.error('Popup error:', error);
      }
    }
  };
};
