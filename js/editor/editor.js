import {addPost} from '../backend.js';
import {isEscEvent} from '../utils/common.js';
import {DOM} from '../utils/DOM.js';
import {showSuccess} from '../utils/notification/success.js';
import {showError} from '../utils/notification/error.js';
import './zoom.js';
import './slider.js';
import './validation.js';
import './file-chooser.js';

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

const handleSuccess = () => {
  showSuccess();
  hideEditor(); // eslint-disable-line no-use-before-define
};

const handleError = () => {
  showError();
  hideEditor(); // eslint-disable-line no-use-before-define
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  addPost(new FormData(formElement), handleSuccess, handleError);
};

const hideEditor = () => {
  DOM.unlockScroll();
  DOM.hideElement(editorElement);
  closeButtonElement.removeEventListener('click', closeButtonClickHandler);
  formElement.removeEventListener('submit', formSubmitHandler);
  document.removeEventListener('keydown', escPressHandler);
};

const openEditor = () => {
  DOM.lockScroll();
  DOM.showElement(editorElement);
  closeButtonElement.addEventListener('click', closeButtonClickHandler);
  formElement.addEventListener('submit', formSubmitHandler);
  document.addEventListener('keydown', escPressHandler);
};

export {
  openEditor
};
