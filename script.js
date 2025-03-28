import { createInitialState } from './game/state/gameState.js';
import { initializeGame } from './game/state/initialization.js';
import { setupDragAndDrop } from './game/ui/dragDropManager.js';
import { setupResetButton } from './game/ui/resetManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const gameArea = document.querySelector('.game-area');
  const message = document.createElement('div'); // Temporary element
  const gameState = createInitialState([], message);
  
  // Initial setup
  gameArea.innerHTML = initializeGame(gameState);
  
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');
  const actualMessage = document.getElementById('message');
  const resetButton = document.getElementById('reset');
  const draggableImages = document.querySelectorAll('.draggable');
  
  // Update game state with actual DOM elements
  gameState.cells = cells;
  gameState.message = actualMessage;
  
  setupDragAndDrop(board, draggableImages, gameState);
  setupResetButton(resetButton);
});
