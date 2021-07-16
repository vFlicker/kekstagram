import {addContentToBigPicture} from './big-picture.js';
import {DOM} from '../utils/DOM.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureClickHandler = (picture) => {
  addContentToBigPicture(picture);
};

const createPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  pictureElement.addEventListener('click', pictureClickHandler.bind(null, picture));

  return pictureElement;
};

const clearPictureList = () => {
  const pictureElements = document.querySelectorAll('.picture');
  pictureElements.forEach(DOM.removeElement);
};

export const renderPictures = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();
  const pictureListElement = document.querySelector('.pictures');

  clearPictureList();
  pictures.forEach((picture) => pictureListFragment.appendChild(createPicture(picture)));

  pictureListElement.appendChild(pictureListFragment);
};
