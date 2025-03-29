import { showPopup } from './popupManager.js';
import { checkWin, checkDraw } from '../logic/gameRules.js';
import { initializeBoard } from '../logic/boardOperations.js';
import { SYMBOL_THEMES } from '../../config.js';

export const setupDragAndDrop = (boardElement, draggableImages, gameState) => {
  let draggedItem = null;
  const cells = Array.from(boardElement.children);

  // Setup drag events for draggable images
  draggableImages.forEach(img => {
    img.addEventListener('dragstart', (e) => {
      // Check if it's the current player's turn
      const isPlayer1Symbol = img.dataset.symbol === gameState.player1Symbol.name;
      const isPlayer1Turn = gameState.currentPlayerTurn === 'player1';
      
      if ((isPlayer1Symbol && !isPlayer1Turn) || (!isPlayer1Symbol && isPlayer1Turn)) {
        e.preventDefault();
        showPopup("Wait for your turn!", 'warning');
        return;
      }

      draggedItem = e.target;
      e.dataTransfer.setData('text/plain', e.target.dataset.symbol);
      showPopup(`Lifted ${e.target.dataset.symbol} (Weight: ${e.target.dataset.weight})`, 'info');
      setTimeout(() => {
        e.target.classList.add('dragging');
      }, 0);
    });

    img.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });
  });

  // Setup drop events for board cells
  cells.forEach(cell => {
    cell.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    cell.addEventListener('dragenter', (e) => {
      e.preventDefault();
      if (gameState.gameActive) {
        cell.classList.add('drop-target');
      }
    });

    cell.addEventListener('dragleave', (e) => {
      cell.classList.remove('drop-target');
    });

    cell.addEventListener('drop', (e) => {
      e.preventDefault();
      cell.classList.remove('drop-target');

      if (!gameState.gameActive || !draggedItem) return;

      const symbol = draggedItem.dataset.symbol;
      const weight = draggedItem.dataset.weight;

      if (cell.firstChild) {
        showPopup('Cell already occupied!', 'error');
        return;
      }

      const symbolImg = document.createElement('img');
      symbolImg.src = gameState.currentPlayer.image;
      symbolImg.alt = symbol;
      symbolImg.dataset.symbol = symbol;
      symbolImg.dataset.weight = weight;
      cell.appendChild(symbolImg);

      // Update game state
      cell.dataset.symbol = symbol;
      cell.dataset.weight = weight;
      cell.dataset.player = gameState.currentPlayer === gameState.player1Symbol ? 'player1' : 'player2';

      showPopup(`${gameState.currentPlayer.name} placed ${symbol} (Weight: ${weight})`, 'success');

      // Check win/draw conditions
      if (checkWin(cells, gameState)) {
        showPopup(`${gameState.currentPlayer.name} wins!`, 'success');
        gameState.gameActive = false;
      } else if (checkDraw(cells)) {
        showPopup('Game ended in a draw!', 'info');
        gameState.gameActive = false;
      } else {
        // Switch player and end turn
        gameState.currentPlayer = gameState.currentPlayer === gameState.player1Symbol 
          ? gameState.player2Symbol 
          : gameState.player1Symbol;
        showPopup(`It's now ${gameState.currentPlayer.name}'s turn`, 'info');
        gameState.endTurn();
      }
    });
  });
};

export const renderPlayerSymbols = (container, symbols, weights, theme, isPlayer1) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const themeConfig = SYMBOL_THEMES[theme];
  if (!themeConfig) {
    showPopup('Invalid theme configuration!', 'error');
    return;
  }

  symbols.forEach((symbol, index) => {
    const symbolItem = document.createElement('div');
    symbolItem.className = 'symbol-item';
    symbolItem.draggable = true;
    symbolItem.dataset.symbol = symbol.name;
    symbolItem.dataset.weight = weights[index];
    symbolItem.id = `${symbol.name}-${weights[index]}`;

    const symbolImg = document.createElement('img');
    symbolImg.src = symbol.image;
    symbolImg.alt = `${symbol.name}${weights[index]}`;
    symbolImg.dataset.symbol = symbol.name;
    symbolImg.dataset.weight = weights[index];

    symbolItem.appendChild(symbolImg);
    container.appendChild(symbolItem);
  });

  showPopup(`Symbols rendered for ${isPlayer1 ? 'Player 1' : 'Player 2'}`, 'success');
};
