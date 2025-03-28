export const initializeBoard = (cells) => {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.dataset.symbol = '';
    cell.dataset.weight = '';
  });
};
