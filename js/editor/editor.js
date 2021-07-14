import {isEscEvent} from '../utils/common.js';
import {DOM} from '../utils/DOM.js';

import './zoom.js';
import './slider.js';
import './validation.js';

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


const formSubmitHandler = (evt) => {
  evt.preventDefault();

  hideEditor(); // eslint-disable-line no-use-before-define

  // save(new FormData(formElement), (response) => {
  //   // Скрыть форму если всё ок
  //   // Указать URL как в "Код и магия."

  //   // hideEditor();
  //   console.log(response);
  // }, errorHandler);
};

const hideEditor = () => {
  DOM.unlockScroll();
  DOM.hideElement(editorElement);
  closeButtonElement.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', escPressHandler);
};

const openEditor = () => {
  DOM.lockScroll();
  DOM.showElement(editorElement);
  closeButtonElement.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', escPressHandler);
};

formElement.addEventListener('submit', formSubmitHandler);

export {
  openEditor
};
