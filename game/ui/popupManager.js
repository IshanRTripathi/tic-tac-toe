export const showPopup = (message, type = 'info') => {
  const popupContainer = document.getElementById('popup-container') || createPopupContainer();
  const popup = document.createElement('div');
  popup.className = `popup popup-${type}`;
  popup.textContent = message;
  popupContainer.appendChild(popup);

  setTimeout(() => {
    popup.style.opacity = '0';
    setTimeout(() => popup.remove(), 300);
  }, 2000);
};

const createPopupContainer = () => {
  const container = document.createElement('div');
  container.id = 'popup-container';
  container.className = 'popup-container';
  document.body.appendChild(container);
  return container;
};
