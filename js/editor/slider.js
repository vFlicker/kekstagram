import {DOM} from '../utils/DOM.js';
import {EffectName, sliderSetting} from '../const.js';

const formElement = document.querySelector('.img-upload__form');
const pictureElement = formElement.querySelector('.img-upload__preview img');
const sliderElement = formElement.querySelector('.effect-level__slider');
const scaleElement = formElement.querySelector('.img-upload__effect-level');
const filterContainerElement = formElement.querySelector('.effects__list');

const SliderEffect = {
  [EffectName.NONE]: () => pictureElement.style.filter = 'none',
  [EffectName.CHROME]: (value) => pictureElement.style.filter = `grayscale(${value})`,
  [EffectName.SEPIA]: (value) => pictureElement.style.filter = `sepia(${value})`,
  [EffectName.MARVIN]: (value) => pictureElement.style.filter = `invert(${value}%)`,
  [EffectName.PHOBOS]: (value) => pictureElement.style.filter = `blur(${value}px)`,
  [EffectName.HEAT]: (value) => pictureElement.style.filter = `brightness(${value})`,
};

const FILTER_CLASS_PREFIX = 'effects__preview--';
let currentEffectName = EffectName.NONE;

const setClassNameForPicture = (effectName) => {
  pictureElement.className = '';
  pictureElement.classList.add(`${FILTER_CLASS_PREFIX}${effectName}`);
};

const createSlider = (effectName) => {
  window.noUiSlider.create(
    sliderElement,
    Object.assign(
      {},
      sliderSetting[effectName],
      {connect: 'lower'},
    ),
  );

  DOM.showElement(scaleElement);
};

const updateSlider = (effectName) => {
  sliderElement.noUiSlider.updateOptions(sliderSetting[effectName]);
};

const destroySlider = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

const filterChangeHandler = (evt) => {
  currentEffectName = evt.target.value;
  setClassNameForPicture(currentEffectName);

  if (currentEffectName === EffectName.NONE) {
    setDefaultFilter(); // eslint-disable-line no-use-before-define
    destroySlider();
    return;
  }

  if (sliderElement.noUiSlider) {
    updateSlider(currentEffectName);
    return;
  }

  createSlider(currentEffectName);

  sliderElement.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    SliderEffect[currentEffectName](value);
  });
};

export const setFilterListener = () => {
  filterContainerElement.addEventListener('change', filterChangeHandler);
};

export const removeFilterListener = () => {
  filterContainerElement.removeEventListener('change', filterChangeHandler);
};

export const setDefaultFilter = () => {
  SliderEffect[EffectName.NONE]();
  setClassNameForPicture(EffectName.NONE);
  DOM.hideElement(scaleElement);
  destroySlider();
};
