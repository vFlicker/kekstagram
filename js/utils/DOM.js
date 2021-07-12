const bodyElement = document.querySelector('body');

export const DOM = {
  hideElement: (element) => element.classList.add('hidden'),
  showElement: (element) => element.classList.remove('hidden'),
  lockScroll: () => bodyElement.classList.add('scroll-lock'),
  unlockScroll: () => bodyElement.classList.remove('scroll-lock'),
};
