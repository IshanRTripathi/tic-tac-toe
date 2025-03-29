export const showPopup = (message) => {
  try {
    // Create popup container if it doesn't exist
    let popupContainer = document.querySelector('.popup-container');
    if (!popupContainer) {
      popupContainer = document.createElement('div');
      popupContainer.className = 'popup-container';
      document.body.appendChild(popupContainer);
    }

    // Create popup element with proper styling
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    popup.style.display = 'block';
    popup.style.opacity = '0';
    popupContainer.prepend(popup);

    // Force reflow before animation
    popup.getBoundingClientRect();

    // Fade in animation
    popup.style.opacity = '1';

    // Auto-remove after delay
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => {
        popup.remove();
        if (popupContainer && popupContainer.children.length === 0) {
          popupContainer.remove();
        }
      }, 300);
    }, 3000);

    return popup;
  } catch (error) {
    console.error('Popup error:', error);
    return null;
  }
};
