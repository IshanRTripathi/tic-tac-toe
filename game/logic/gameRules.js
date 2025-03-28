import { winConditions } from './winConditions.js';

export const checkWin = (cells) => {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (cells[a].dataset.symbol && 
        cells[a].dataset.symbol === cells[b].dataset.symbol && 
        cells[b].dataset.symbol === cells[c].dataset.symbol) {
      return cells[a].dataset.symbol;
    }
  }
  return false;
};

export const checkDraw = (cells) => {
  return Array.from(cells).every(cell => cell.dataset.symbol);
};
