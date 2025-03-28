import { initializeBoard } from '../logic/boardOperations.js';
import { IMAGE_URLS } from '../../config.js';

export const initializeGame = (gameState) => {
  // Reset game state
  gameState.currentPlayer = 'X';
  gameState.gameActive = true;
  gameState.message.textContent = '';
  gameState.xCount = 6;
  gameState.oCount = 6;
  
  // Clear the board
  initializeBoard(gameState.cells);
  
  // Recreate symbols HTML with CDN URLs
  return `
    <div class="player-x">
      <h2>Player X</h2>
      <div class="symbol-row">
        <img src="${IMAGE_URLS.X}" alt="X1" class="draggable" draggable="true" data-symbol="X" data-weight="1">
        <img src="${IMAGE_URLS.X}" alt="X1" class="draggable" draggable="true" data-symbol="X" data-weight="1">
      </div>
      <div class="symbol-row">
        <img src="${IMAGE_URLS.X}" alt="X2" class="draggable" draggable="true" data-symbol="X" data-weight="2">
        <img src="${IMAGE_URLS.X}" alt="X2" class="draggable" draggable="true" data-symbol="X" data-weight="2">
      </div>
      <div class="symbol-row">
        <img src="${IMAGE_URLS.X}" alt="X3" class="draggable" draggable="true" data-symbol="X" data-weight="3">
        <img src="${IMAGE_URLS.X}" alt="X3" class="draggable" draggable="true" data-symbol="X" data-weight="3">
      </div>
    </div>
    <div class="board-container">
      <div id="board">
        <div class="cell" data-index="0"></div>
        <div class="cell" data-index="1"></div>
        <div class="cell" data-index="2"></div>
        <div class="cell" data-index="3"></div>
        <div class="cell" data-index="4"></div>
        <div class="cell" data-index="5"></div>
        <div class="cell" data-index="6"></div>
        <div class="cell" data-index="7"></div>
        <div class="cell" data-index="8"></div>
      </div>
      <div id="message"></div>
      <button id="reset">Reset Game</button>
    </div>
    <div class="player-o">
      <h2>Player O</h2>
      <div class="symbol-row">
        <img src="${IMAGE_URLS.O}" alt="O1" class="draggable" draggable="true" data-symbol="O" data-weight="1">
        <img src="${IMAGE_URLS.O}" alt="O1" class="draggable" draggable="true" data-symbol="O" data-weight="1">
      </div>
      <div class="symbol-row">
        <img src="${IMAGE_URLS.O}" alt="O2" class="draggable" draggable="true" data-symbol="O" data-weight="2">
        <img src="${IMAGE_URLS.O}" alt="O2" class="draggable" draggable="true" data-symbol="O" data-weight="2">
      </div>
      <div class="symbol-row">
        <img src="${IMAGE_URLS.O}" alt="O3" class="draggable" draggable="true" data-symbol="O" data-weight="3">
        <img src="${IMAGE_URLS.O}" alt="O3" class="draggable" draggable="true" data-symbol="O" data-weight="3">
      </div>
    </div>
  `;
};
