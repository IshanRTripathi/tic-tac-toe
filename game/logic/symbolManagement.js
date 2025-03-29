import { symbolWeights } from './winConditions.js';
import { SYMBOL_THEMES } from '../../config.js';

export const initializeSymbols = (theme = 'XO') => {
  const themeConfig = SYMBOL_THEMES[theme] || SYMBOL_THEMES.XO;
  const xImages = document.querySelectorAll('.player-x .draggable');
  const oImages = document.querySelectorAll('.player-o .draggable');

  xImages.forEach((img, index) => {
    const weight = symbolWeights[index];
    img.src = themeConfig.symbols.images.player1;
    img.alt = `${themeConfig.symbols.player1}${weight}`;
    img.dataset.symbol = themeConfig.symbols.player1;
    img.dataset.weight = weight;
    img.style.display = 'block';
  });

  oImages.forEach((img, index) => {
    const weight = symbolWeights[index];
    img.src = themeConfig.symbols.images.player2;
    img.alt = `${themeConfig.symbols.player2}${weight}`;
    img.dataset.symbol = themeConfig.symbols.player2;
    img.dataset.weight = weight;
    img.style.display = 'block';
  });
};
