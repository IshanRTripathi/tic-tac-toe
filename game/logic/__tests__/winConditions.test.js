import { winConditions, symbolWeights } from '../winConditions.js';

describe('winConditions', () => {
  test('should have 8 win conditions', () => {
    expect(winConditions.length).toBe(8);
  });

  test('each condition should have 3 elements', () => {
    winConditions.forEach(condition => {
      expect(condition.length).toBe(3);
    });
  });

  test('symbolWeights should have correct values', () => {
    expect(symbolWeights).toEqual([1, 1, 2, 2, 3, 3]);
  });
});
