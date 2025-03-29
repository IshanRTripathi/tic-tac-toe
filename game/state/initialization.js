import { createInitialState } from './gameState.js';
import { setupDragAndDrop, renderPlayerSymbols } from '../ui/dragDropManager.js';
import { initializeBoard } from '../logic/boardOperations.js';
import { setupResetButton } from '../ui/resetManager.js';
import { SYMBOL_THEMES } from '../../config.js';

export const initializeGame = (theme = 'XO') => {
  const board = document.getElementById('board');
  const message = document.getElementById('message');
  const resetButton = document.getElementById('reset');
  const player1SymbolsContainer = document.getElementById('player1-symbols');
  const player2SymbolsContainer = document.getElementById('player2-symbols');
  
  // Clear board
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  // Create cells
  const cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    board.appendChild(cell);
    cells.push(cell);
  }

  const themeConfig = SYMBOL_THEMES[theme] || SYMBOL_THEMES.XO;
  const gameState = createInitialState(cells, message, theme);

  // Render player symbols - FIXED: Use correct player symbols from theme
  const player1Symbols = Array(6).fill(themeConfig.symbols.player1);
  const player1Weights = [1, 1, 2, 2, 3, 3];
  
  const player2Symbols = Array(6).fill(themeConfig.symbols.player2);
  const player2Weights = [1, 1, 2, 2, 3, 3];

  renderPlayerSymbols(player1SymbolsContainer, player1Symbols, player1Weights, theme, true);
  renderPlayerSymbols(player2SymbolsContainer, player2Symbols, player2Weights, theme, false);

  // Get all draggable images after rendering
  const draggableImages = [
    ...player1SymbolsContainer.querySelectorAll('.symbol-item'),
    ...player2SymbolsContainer.querySelectorAll('.symbol-item')
  ];

  setupDragAndDrop(board, draggableImages, gameState);
  setupResetButton(resetButton, gameState);
};
