import { initializeGame } from '../state/initialization.js';

export const setupResetButton = (button, gameState) => {
  if (!button) return;
  
  button.addEventListener('click', () => {
    const themeSelector = document.querySelector('.theme-selector');
    const currentTheme = themeSelector ? themeSelector.value : 'XO';
    initializeGame(currentTheme);
  });
};
