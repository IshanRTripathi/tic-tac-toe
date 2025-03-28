export const setupResetButton = (resetButton) => {
  resetButton.addEventListener('click', () => {
    window.location.reload();
  });
};
