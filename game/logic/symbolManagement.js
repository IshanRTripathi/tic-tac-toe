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

    // Clear existing symbols
    player1Container.innerHTML = '';
    player2Container.innerHTML = '';

    // Create player title elements
    const player1Title = document.createElement('h3');
    player1Title.className = 'player-title';
    player1Title.textContent = 'Player 1';
    player1Container.parentNode.insertBefore(player1Title, player1Container);

    const player2Title = document.createElement('h3');
    player2Title.className = 'player-title';
    player2Title.textContent = 'Player 2';
    player2Container.parentNode.insertBefore(player2Title, player2Container);

    // Create weight groups for both players
    const createWeightGroups = (container, playerSymbol) => {
      // Group symbols by weight (1, 2, 3)
      const weightGroups = {
        weight1: [],
        weight2: [],
        weight3: []
      };

      // Create all symbols first and group them by weight
      symbolWeights.forEach((weight) => {
        for (let i = 0; i < 2; i++) {
          const symbolDiv = document.createElement('div');
          symbolDiv.className = 'symbol-item';
          
          const img = document.createElement('img');
          img.className = 'draggable';
          img.src = playerSymbol.image;
          img.alt = `${playerSymbol.name}${weight}`;
          img.dataset.symbol = playerSymbol.name;
          img.dataset.weight = weight;
          img.draggable = true;
          
          symbolDiv.appendChild(img);
          
          // Add to appropriate weight group
          if (weight === 1) weightGroups.weight1.push(symbolDiv);
          else if (weight === 2) weightGroups.weight2.push(symbolDiv);
          else weightGroups.weight3.push(symbolDiv);
        }
      });

      // Create containers for each weight group
      Object.entries(weightGroups).forEach(([weightKey, symbols]) => {
        if (symbols.length > 0) {
          const weightContainer = document.createElement('div');
          weightContainer.className = `weight-group ${weightKey}`;
          
          // Add all symbols for this weight side by side
          symbols.forEach(symbol => {
            weightContainer.appendChild(symbol);
          });
          
          container.appendChild(weightContainer);
        }
      });
    };

    createWeightGroups(player1Container, themeConfig.symbols.player1);
    createWeightGroups(player2Container, themeConfig.symbols.player2);

    showPopup('Symbols initialized', 'success');
    return true;
  } catch (error) {
    console.error('Symbol initialization error:', error);
    showPopup('Failed to initialize symbols', 'error');
    throw error;
  }
};
