import { symbolWeights } from './winConditions.js';
import { SYMBOL_THEMES } from '../../config.js';
import { showPopup } from '../ui/popupManager.js';

export const initializeSymbols = (theme = 'XO') => {
  try {
    const themeConfig = SYMBOL_THEMES[theme] || SYMBOL_THEMES.XO;
    const player1Container = document.getElementById('player1-symbols');
    const player2Container = document.getElementById('player2-symbols');

    if (!player1Container || !player2Container) {
      throw new Error('Player symbol containers not found');
    }

    // Clear existing symbols and titles completely
    player1Container.innerHTML = '';
    player2Container.innerHTML = '';

    // Remove all existing titles
    const existingTitles = document.querySelectorAll('.player-title');
    existingTitles.forEach(title => title.remove());

    // Create single player title element
    const createPlayerTitle = (container, playerName) => {
      const title = document.createElement('h3');
      title.className = 'player-title';
      title.textContent = playerName;
      container.parentNode.insertBefore(title, container);
    };

    createPlayerTitle(player1Container, 'Player 1');
    createPlayerTitle(player2Container, 'Player 2');

    // Consistent weighted symbol distribution (total 6 per player)
    const weightedPairs = [
      { weight: 1, count: 2 },
      { weight: 2, count: 2 },
      { weight: 3, count: 2 }
    ];

    // Create symbols for a player
    const createSymbols = (container, playerSymbol) => {
      weightedPairs.forEach(({ weight, count }) => {
        for (let i = 0; i < count; i++) {
          const symbolDiv = document.createElement('div');
          symbolDiv.className = 'symbol-item';
          symbolDiv.dataset.weight = weight;
          
          const img = document.createElement('img');
          img.className = 'draggable';
          img.src = playerSymbol.image;
          img.alt = `${playerSymbol.name}${weight}`;
          img.dataset.symbol = playerSymbol.name;
          img.dataset.weight = weight;
          img.draggable = true;
          
          symbolDiv.appendChild(img);
          container.appendChild(symbolDiv);
        }
      });
    };

    createSymbols(player1Container, themeConfig.symbols.player1);
    createSymbols(player2Container, themeConfig.symbols.player2);

    return true;
  } catch (error) {
    console.error('Symbol initialization error:', error);
    showPopup('Failed to initialize symbols', 'error');
    throw error;
  }
};
