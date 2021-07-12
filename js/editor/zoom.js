import {ZoomVariables} from '../const.js';

const formElement = document.querySelector('.img-upload__form');
const minusButtonElement = formElement.querySelector('.scale__control--smaller');
const plusButtonElement = formElement.querySelector('.scale__control--bigger');
const scaleElement = formElement.querySelector('.scale__control--value');
const photoElement = formElement.querySelector('.img-upload__preview img');

let scaleValue = parseInt(scaleElement.value, 10);

const minusButtonClickHandler = () => {
  if (scaleValue > ZoomVariables.MIN) {
    scaleValue -= ZoomVariables.STEP;
    photoElement.style.width = `${scaleValue}%`;
    scaleElement.value = `${scaleValue}%`;
  }
};

const plusButtonClickHandler = () => {
  if (scaleValue < ZoomVariables.MAX) {
    scaleValue += ZoomVariables.STEP;
    photoElement.style.width = `${scaleValue}%`;
    scaleElement.value = `${scaleValue}%`;
  }
};

minusButtonElement.addEventListener('click', minusButtonClickHandler);
plusButtonElement.addEventListener('click', plusButtonClickHandler);
