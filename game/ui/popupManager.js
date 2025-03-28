export const showPopup = (message) => {
  console.log('Popup triggered with message:', message); // Debug log
  
  const popupContainer = document.querySelector('.popup-container') || (() => {
    const container = document.createElement('div');
    container.className = 'popup-container';
    document.body.appendChild(container);
    return container;
  })();

  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;
  popupContainer.prepend(popup);
  
  setTimeout(() => {
    popup.remove();
    if (popupContainer.children.length === 0) {
      popupContainer.remove();
    }
  }, 5000);
  
  return popup; // For testing
};
