import { initializeBoard } from '../boardOperations.js';

describe('boardOperations', () => {
  test('should clear all cell data', () => {
    const cells = Array(9).fill().map(() => ({ 
      textContent: 'X',
      dataset: { symbol: 'X', weight: '1' }
    }));

    initializeBoard(cells);

    cells.forEach(cell => {
      expect(cell.textContent).toBe('');
      expect(cell.dataset.symbol).toBe('');
      expect(cell.dataset.weight).toBe('');
    });
  });
});
