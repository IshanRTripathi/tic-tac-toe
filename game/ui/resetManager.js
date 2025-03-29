import { initializeBoard } from '../logic/boardOperations.js';
import { SYMBOL_THEMES } from '../../config.js';
import { showPopup } from './popupManager.js';

export const setupResetButton = (button, gameState) => {
  button.addEventListener('click', () => {
    const boardCells = document.querySelectorAll('.cell');
    initializeBoard(boardCells);
    gameState.cells = Array(9).fill(null);
    gameState.gameActive = true;
    gameState.currentPlayer = SYMBOL_THEMES[gameState.currentTheme].symbols.player1;
    gameState.currentPlayerTurn = 'player1';
    showPopup('Game has been reset', 'success');
  });
};
