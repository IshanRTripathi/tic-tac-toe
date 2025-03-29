import { createInitialState } from './gameState.js';
import { setupDragAndDrop } from '../ui/dragDropManager.js';
import { initializeBoard } from '../logic/boardOperations.js';
import { setupResetButton } from '../ui/resetManager.js';
import { initializeSymbols } from '../logic/symbolManagement.js';
import { SYMBOL_THEMES } from '../../config.js';

export const initializeGame = (theme = 'XO') => {
  const board = document.getElementById('board');
  const message = document.getElementById('message');
  const resetButton = document.getElementById('reset');
  const player1SymbolsContainer = document.getElementById('player1-symbols');
  const player2SymbolsContainer = document.getElementById('player2-symbols');
  
  // Clear board completely
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  // Create fresh cells
  const cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    board.appendChild(cell);
    cells.push(null); // Initialize with null to represent empty cells
  }

  // Initialize symbols first to ensure containers are ready
  initializeSymbols(theme);

  // Get all fresh draggable elements after symbol initialization
  const draggableImages = [
    ...player1SymbolsContainer.querySelectorAll('.symbol-item'),
    ...player2SymbolsContainer.querySelectorAll('.symbol-item')
  ];

  // Create new game state with fresh elements
  const gameState = createInitialState(cells, message, theme);

  // Set up fresh event listeners
  setupDragAndDrop(board, draggableImages, gameState);
  setupResetButton(resetButton, gameState);

  return gameState;
};
