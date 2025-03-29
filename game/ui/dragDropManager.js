import { showPopup } from './popupManager.js';
import { checkWin, checkDraw } from '../logic/gameRules.js';
import { initializeBoard } from '../logic/boardOperations.js';
import { IMAGE_URLS } from '../../config.js';

export const setupDragAndDrop = (board, draggableImages, gameState) => {
  let draggedSymbol = null;
  let draggedWeight = null;
  let draggedElement = null;

  const handleDragStart = (e) => {
    draggedSymbol = e.target.dataset.symbol;
    draggedWeight = parseInt(e.target.dataset.weight);
    draggedElement = e.target;
    e.dataTransfer.setData('text/plain', e.target.id);
    showPopup(`Dragging ${draggedSymbol} with weight ${draggedWeight}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!gameState.gameActive) return;

    const cell = e.target.closest('.cell');
    if (!cell) return;

    const index = parseInt(cell.dataset.index);

    if (!draggedSymbol || draggedSymbol !== gameState.currentPlayer) {
      showPopup('Invalid symbol or not your turn');
      return;
    }

    const currentSymbol = cell.dataset.symbol;
    const currentWeight = parseInt(cell.dataset.weight || 0);

    if (currentSymbol && currentWeight >= draggedWeight) {
      showPopup(`Cannot override ${currentSymbol} (weight ${currentWeight}) with ${draggedSymbol} (weight ${draggedWeight})`);
      return;
    }

    if (currentSymbol) {
      showPopup(`Overriding ${currentSymbol} (weight ${currentWeight}) with ${draggedSymbol} (weight ${draggedWeight})`);
    }

    // Clear cell content safely
    while (cell.firstChild) {
      cell.removeChild(cell.firstChild);
    }

    // Create and append new symbol image
    const cellImg = document.createElement('img');
    cellImg.src = IMAGE_URLS[draggedSymbol];
    cellImg.alt = `${draggedSymbol}${draggedWeight}`;
    cellImg.dataset.symbol = draggedSymbol;
    cellImg.dataset.weight = draggedWeight;
    cellImg.className = 'cell-symbol';
    cell.appendChild(cellImg);

    // Update cell attributes
    cell.dataset.symbol = draggedSymbol;
    cell.dataset.weight = draggedWeight;

    if (draggedElement) {
      draggedElement.parentNode.removeChild(draggedElement);
    }

    if (draggedSymbol === gameState.player1Symbol) gameState.player1Count--;
    else gameState.player2Count--;

    const winner = checkWin(gameState.cells);
    if (winner) {
      gameState.message.textContent = `Player ${winner} wins!`;
      gameState.gameActive = false;
      showPopup(`Player ${winner} wins!`);
      return;
    }

    if (checkDraw(gameState.cells)) {
      gameState.message.textContent = 'It\'s a draw!';
      gameState.gameActive = false;
      showPopup('Game ended in a draw');
      return;
    }

    gameState.currentPlayer = gameState.currentPlayer === gameState.player1Symbol 
      ? gameState.player2Symbol 
      : gameState.player1Symbol;
    showPopup(`Next player: ${gameState.currentPlayer}`);
  };

  // Remove existing listeners
  if (draggableImages && draggableImages.length > 0) {
    draggableImages.forEach(img => {
      img.removeEventListener('dragstart', handleDragStart);
    });
  }

  if (board) {
    board.removeEventListener('dragover', handleDragOver);
    board.removeEventListener('drop', handleDrop);
  }

  // Add new listeners
  if (draggableImages && draggableImages.length > 0) {
    draggableImages.forEach((image) => {
      image.addEventListener('dragstart', handleDragStart);
    });
  }

  if (board) {
    board.addEventListener('dragover', handleDragOver);
    board.addEventListener('drop', handleDrop);
  }
};

export const renderPlayerSymbols = (container, symbols, weights, theme) => {
  // Clear container safely
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Create and append symbols
  symbols.forEach((symbol, index) => {
    const symbolItem = document.createElement('div');
    symbolItem.className = 'symbol-item';
    symbolItem.draggable = true;
    symbolItem.dataset.symbol = symbol;
    symbolItem.dataset.weight = weights[index];
    symbolItem.id = `${symbol}-${weights[index]}`;

    const symbolImg = document.createElement('img');
    symbolImg.src = IMAGE_URLS[symbol];
    symbolImg.alt = `${symbol}${weights[index]}`;
    symbolImg.dataset.symbol = symbol;
    symbolImg.dataset.weight = weights[index];

    symbolItem.appendChild(symbolImg);
    container.appendChild(symbolItem);
  });
};
