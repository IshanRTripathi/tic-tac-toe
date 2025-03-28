export const createInitialState = (cells, messageElement) => {
  return {
    currentPlayer: 'X',
    gameActive: true,
    xCount: 6,
    oCount: 6,
    cells: cells,
    message: messageElement,
    weights: {
      'X': [1, 1, 2, 2, 3, 3],
      'O': [1, 1, 2, 2, 3, 3]
    }
  };
};
