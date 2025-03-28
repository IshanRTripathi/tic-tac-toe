import { checkWin, checkDraw } from '../gameRules.js';

describe('gameRules', () => {
  describe('checkWin', () => {
    test('should detect horizontal win', () => {
      const cells = Array(9).fill().map(() => ({ dataset: { symbol: '' } }));
      cells[0].dataset.symbol = 'X';
      cells[1].dataset.symbol = 'X';
      cells[2].dataset.symbol = 'X';
      expect(checkWin(cells)).toBe('X');
    });

    test('should detect vertical win', () => {
      const cells = Array(9).fill().map(() => ({ dataset: { symbol: '' } }));
      cells[1].dataset.symbol = 'O';
      cells[4].dataset.symbol = 'O';
      cells[7].dataset.symbol = 'O';
      expect(checkWin(cells)).toBe('O');
    });

    test('should detect diagonal win', () => {
      const cells = Array(9).fill().map(() => ({ dataset: { symbol: '' } }));
      cells[0].dataset.symbol = 'X';
      cells[4].dataset.symbol = 'X';
      cells[8].dataset.symbol = 'X';
      expect(checkWin(cells)).toBe('X');
    });

    test('should return false when no win', () => {
      const cells = Array(9).fill().map(() => ({ dataset: { symbol: '' } }));
      expect(checkWin(cells)).toBe(false);
    });
  });

  describe('checkDraw', () => {
    test('should detect draw when all cells are filled', () => {
      const cells = Array(9).fill().map(() => ({ dataset: { symbol: 'X' } }));
      expect(checkDraw(cells)).toBe(true);
    });

    test('should return false when not all cells are filled', () => {
      const cells = Array(9).fill().map(() => ({ dataset: { symbol: 'X' } }));
      cells[0].dataset.symbol = '';
      expect(checkDraw(cells)).toBe(false);
    });
  });
});
