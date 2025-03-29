import { winConditions } from './winConditions.js';
import { SYMBOL_THEMES } from '../../config.js';

export const checkWin = (cells, gameState) => {
  const currentPlayerSymbol = gameState.currentPlayer.name;
  
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (cells[a].dataset.symbol && 
        cells[a].dataset.symbol === currentPlayerSymbol && 
        cells[a].dataset.symbol === cells[b].dataset.symbol && 
        cells[a].dataset.symbol === cells[c].dataset.symbol) {
      return true;
    }
  }
  return false;
};

export const checkDraw = (cells) => {
  return cells.every(cell => cell.dataset.symbol);
};
