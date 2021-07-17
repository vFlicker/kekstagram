import {addPost} from '../api.js';
import {setDefaultFilter, setFilterListener, removeFilterListener} from './slider.js';
import {clearInputs, setInputListeners, removeInputListeners} from './validation.js';
import {setDefaultZoomValue, setZoomListeners, removeZoomListeners} from './zoom.js';
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
  setDefaultFilter();
  setDefaultZoomValue();
};

const addListeners = () => {
  setInputListeners();
  setFilterListener();
  setZoomListeners();
  closeButtonElement.addEventListener('click', closeButtonClickHandler);
  formElement.addEventListener('submit', formSubmitHandler);
  document.addEventListener('keydown', escPressHandler);
};

const removeListeners = () => {
  removeInputListeners();
  removeFilterListener();
  removeZoomListeners();
  closeButtonElement.removeEventListener('click', closeButtonClickHandler);
  formElement.removeEventListener('submit', formSubmitHandler);
  document.removeEventListener('keydown', escPressHandler);
};

const hideEditor = () => {
  clearForm();
  DOM.unlockScroll();
  DOM.hideElement(editorElement);
  removeListeners();
};

export const openEditor = () => {
  DOM.lockScroll();
  DOM.showElement(editorElement);
  addListeners();
};
