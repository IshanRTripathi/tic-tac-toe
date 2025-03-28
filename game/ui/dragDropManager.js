import { showPopup } from './popupManager.js';
import { checkWin, checkDraw } from '../logic/gameRules.js';
import { initializeBoard } from '../logic/boardOperations.js';

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

    cell.textContent = draggedSymbol;
    cell.dataset.symbol = draggedSymbol;
    cell.dataset.weight = draggedWeight;

    if (draggedElement) draggedElement.remove();

    if (draggedSymbol === 'X') gameState.xCount--;
    else gameState.oCount--;

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

    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    showPopup(`Next player: ${gameState.currentPlayer}`);
  };

  draggableImages.forEach(img => {
    img.removeEventListener('dragstart', handleDragStart);
  });
  board.removeEventListener('dragover', handleDragOver);
  board.removeEventListener('drop', handleDrop);

  draggableImages.forEach((image) => {
    image.addEventListener('dragstart', handleDragStart);
  });

  board.addEventListener('dragover', handleDragOver);
  board.addEventListener('drop', handleDrop);
};
