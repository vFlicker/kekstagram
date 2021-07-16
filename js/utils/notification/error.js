import {isEscEvent} from '../common.js';
import {DOM} from '../DOM.js';

const mainElement = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
let errorElement = null;

const escPressHandler = (evt) => {
  if (isEscEvent(evt.keyCode)) {
    closeErrorNotification(); // eslint-disable-line no-use-before-define
  }
};

const closeButtonClickHandler = (evt) => {
  evt.preventDefault();
  closeErrorNotification(); // eslint-disable-line no-use-before-define
};

const closeErrorNotification = () => {
  DOM.removeElement(errorElement);
  DOM.unlockScroll();
  document.removeEventListener('keydown', escPressHandler);
};

const createErrorNotification = () => {
  errorElement = errorTemplate.cloneNode(true);
  const closeButtons = errorElement.querySelectorAll('.error__button');

  closeButtons.forEach((closeButton) => closeButton.addEventListener('click', closeButtonClickHandler));
  document.addEventListener('keydown', escPressHandler);

  return errorElement;
};

export const showError = () => {
  const errorNotification = createErrorNotification();
  mainElement.appendChild(errorNotification);
};
