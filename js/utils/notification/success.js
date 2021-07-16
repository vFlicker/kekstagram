import {isEscEvent} from '../common.js';
import {DOM} from '../DOM.js';

const mainElement = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
let successElement = null;

const escPressHandler = (evt) => {
  if (isEscEvent(evt.keyCode)) {
    closeSuccessNotification(); // eslint-disable-line no-use-before-define
  }
};

const nextButtonHandler = (evt) => {
  evt.preventDefault();
  closeSuccessNotification(); // eslint-disable-line no-use-before-define
};

const closeSuccessNotification = () => {
  DOM.removeElement(successElement);
  DOM.unlockScroll();
  document.removeEventListener('keydown', escPressHandler);
};

const createSuccessNotification = () => {
  successElement = successTemplate.cloneNode(true);
  const nextButtonElement = successElement.querySelector('.success__button');

  nextButtonElement.addEventListener('click', nextButtonHandler);
  document.addEventListener('keydown', escPressHandler);

  return successElement;
};

export const showSuccess = () => {
  const successNotification = createSuccessNotification();
  mainElement.appendChild(successNotification);
};
