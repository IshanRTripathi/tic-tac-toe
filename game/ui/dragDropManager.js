import { showPopup } from './popupManager.js';
import { checkWin, checkDraw } from '../logic/gameRules.js';
import { initializeBoard } from '../logic/boardOperations.js';

export const setupDragAndDrop = (boardElement, draggableImages, gameState) => {
  let draggedItem = null;
  const cells = Array.from(boardElement.children);

  // Setup drag events for draggable images
  draggableImages.forEach(img => {
    img.addEventListener('dragstart', (e) => {
      if (!gameState.gameActive) {
        e.preventDefault();
        return;
      }

      // Only allow dragging if it's the current player's turn
      const isPlayer1 = gameState.currentPlayer === gameState.player1Symbol;
      const isPlayer1Symbol = e.target.dataset.symbol === gameState.player1Symbol.name;
      
      if ((isPlayer1 && !isPlayer1Symbol) || (!isPlayer1 && isPlayer1Symbol)) {
        e.preventDefault();
        showPopup(`It's ${gameState.currentPlayer.name}'s turn!`, 'error');
        return;
      }

      draggedItem = e.target;
      e.dataTransfer.setData('text/plain', e.target.dataset.symbol);
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
      const weight = parseInt(draggedItem.dataset.weight);

      // Verify it's the correct player's turn
      const isPlayer1 = gameState.currentPlayer === gameState.player1Symbol;
      const isPlayer1Symbol = symbol === gameState.player1Symbol.name;
      
      if ((isPlayer1 && !isPlayer1Symbol) || (!isPlayer1 && isPlayer1Symbol)) {
        showPopup(`It's ${gameState.currentPlayer.name}'s turn!`, 'error');
        return;
      }

      // Check if cell is occupied
      if (cell.firstChild) {
        const existingWeight = parseInt(cell.firstChild.dataset.weight);
        
        // Only allow override if new symbol has higher weight
        if (weight > existingWeight) {
          // Remove existing symbol
          cell.innerHTML = '';
        } else {
          showPopup('Cannot override - new symbol must have higher weight!', 'error');
          return;
        }
      }

      const symbolImg = document.createElement('img');
      symbolImg.src = draggedItem.src;
      symbolImg.alt = symbol;
      symbolImg.dataset.symbol = symbol;
      symbolImg.dataset.weight = weight;
      cell.appendChild(symbolImg);

      // Remove the placed symbol from player's inventory
      const playerContainer = isPlayer1 
        ? document.getElementById('player1-symbols') 
        : document.getElementById('player2-symbols');
      
      if (playerContainer) {
        const symbolToRemove = Array.from(playerContainer.querySelectorAll('.symbol-item img'))
          .find(img => img.dataset.symbol === symbol && parseInt(img.dataset.weight) === weight);
        
        if (symbolToRemove) {
          symbolToRemove.parentElement.remove();
        }
      }

      // Update game state
      cell.dataset.symbol = symbol;
      cell.dataset.weight = weight;
      cell.dataset.player = isPlayer1 ? 'player1' : 'player2';

      // Check win/draw conditions
      if (checkWin(cells, gameState)) {
        showPopup(`${gameState.currentPlayer.name} wins!`, 'success');
        gameState.gameActive = false;
      } else if (checkDraw(cells)) {
        showPopup('Game ended in a draw!', 'info');
        gameState.gameActive = false;
      } else {
        // Switch player
        gameState.currentPlayer = isPlayer1 
          ? gameState.player2Symbol 
          : gameState.player1Symbol;
        gameState.endTurn();
      }
    });
  });
};

export const renderPlayerSymbols = (container, symbols, weights, theme, isPlayer1) => {
  container.innerHTML = '';
  
  symbols.forEach((symbol, index) => {
    const symbolItem = document.createElement('div');
    symbolItem.className = 'symbol-item';
    symbolItem.draggable = true;
    symbolItem.dataset.symbol = symbol.name;
    symbolItem.dataset.weight = weights[index];

    const symbolImg = document.createElement('img');
    symbolImg.src = symbol.image;
    symbolImg.alt = `${symbol.name}${weights[index]}`;
    symbolImg.dataset.symbol = symbol.name;
    symbolImg.dataset.weight = weights[index];
    symbolImg.draggable = true;

    symbolItem.appendChild(symbolImg);
    container.appendChild(symbolItem);
  });
};
