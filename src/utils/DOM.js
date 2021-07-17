const bodyElement = document.querySelector('body');

export const DOM = {
  lockScroll: () => bodyElement.classList.add('scroll-lock'),
  unlockScroll: () => bodyElement.classList.remove('scroll-lock'),
  hideElement: (element) => element.classList.add('hidden'),
  showElement: (element) => element.classList.remove('hidden'),
  removeElement: (element) => element.remove(),
};
