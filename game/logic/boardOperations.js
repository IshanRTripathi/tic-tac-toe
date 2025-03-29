export const initializeBoard = (cells) => {
  if (!Array.isArray(cells)) {
    cells = Array.from(cells) || [];
  }
  
  cells.forEach(cell => {
    if (cell) {
      cell.textContent = '';
      cell.dataset.symbol = '';
      cell.dataset.weight = '';
      cell.dataset.player = '';
    }
  });
};
