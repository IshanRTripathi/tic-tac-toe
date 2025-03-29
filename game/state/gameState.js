import { SYMBOL_THEMES } from '../../config.js';
import { showPopup } from '../ui/popupManager.js';

export const createInitialState = (cells, message, theme = 'XO') => {
  const themeConfig = SYMBOL_THEMES[theme] || SYMBOL_THEMES.XO;
  
  return {
    cells: cells,
    message: message,
    gameActive: true,
    currentPlayer: themeConfig.symbols.player1,
    player1Symbol: themeConfig.symbols.player1,
    player2Symbol: themeConfig.symbols.player2,
    currentTheme: theme,
    currentPlayerTurn: 'player1',
    showPopup: (msg) => {
      showPopup(msg);
    },
    endTurn: function() {
      this.currentPlayerTurn = this.currentPlayerTurn === 'player1' ? 'player2' : 'player1';
    }
  };
};
