import {addPost} from '../api.js';
import {setDefaultFilter} from './slider.js';
import {clearInputs} from './validation.js';
import {setDefaultZoomValue} from './zoom.js';
import {isEscEvent} from '../utils/common.js';
import {DOM} from '../utils/DOM.js';
import {showSuccess} from '../utils/notification/success.js';
import {showError} from '../utils/notification/error.js';

const formElement = document.querySelector('.img-upload__form');
const editorElement = formElement.querySelector('.img-upload__overlay');
const closeButtonElement = formElement.querySelector('.img-upload__cancel');

const escPressHandler = (evt) => {
  if (isEscEvent(evt.keyCode)) {
    closeButtonClickHandler(); // eslint-disable-line no-use-before-define
  }
};

const closeButtonClickHandler = () => {
  hideEditor(); // eslint-disable-line no-use-before-define
};

const successHandler = () => {
  showSuccess();
  hideEditor(); // eslint-disable-line no-use-before-define
};

const errorHandler = () => {
  showError();
  hideEditor(); // eslint-disable-line no-use-before-define
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  addPost(new FormData(formElement))
    .then(successHandler)
    .catch(errorHandler);
};

const clearForm = () => {
  clearInputs();
  setDefaultZoomValue();
  setDefaultFilter();
};

const hideEditor = () => {
  clearForm();
  DOM.unlockScroll();
  DOM.hideElement(editorElement);
  closeButtonElement.removeEventListener('click', closeButtonClickHandler);
  formElement.removeEventListener('submit', formSubmitHandler);
  document.removeEventListener('keydown', escPressHandler);
};

export const openEditor = () => {
  DOM.lockScroll();
  DOM.showElement(editorElement);
  closeButtonElement.addEventListener('click', closeButtonClickHandler);
  formElement.addEventListener('submit', formSubmitHandler);
  document.addEventListener('keydown', escPressHandler);
};
