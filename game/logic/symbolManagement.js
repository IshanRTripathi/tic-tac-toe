import { symbolWeights } from './winConditions.js';
import { IMAGE_URLS } from '../../config.js';

export const initializeSymbols = () => {
  const xImages = document.querySelectorAll('.player-x .draggable');
  const oImages = document.querySelectorAll('.player-o .draggable');

  xImages.forEach((img, index) => {
    const weight = symbolWeights[index];
    img.src = IMAGE_URLS.X;
    img.alt = `X${weight}`;
    img.dataset.symbol = 'X';
    img.dataset.weight = weight;
    img.style.display = 'block';
  });

  oImages.forEach((img, index) => {
    const weight = symbolWeights[index];
    img.src = IMAGE_URLS.O;
    img.alt = `O${weight}`;
    img.dataset.symbol = 'O';
    img.dataset.weight = weight;
    img.style.display = 'block';
  });
};
