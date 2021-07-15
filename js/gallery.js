import {getPosts} from './backend.js';
import {renderPictures} from './render-pictures.js';
import {getRandomElement} from './utils/common.js';

let photosFormServer;

const filtersForm = document.querySelector('.img-filters__form');
const buttons = filtersForm.querySelectorAll('.img-filters__button');
const buttonPopular = filtersForm.querySelector('#filter-popular');
const buttonNew = filtersForm.querySelector('#filter-new');
const buttonDiscussed = filtersForm.querySelector('#filter-discussed');
const filters = document.querySelector('.img-filters');

const photoDiscusseComparator = (left, right) => right.comments.length - left.comments.length;

const changeActiveButton = (activeButton) => {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('img-filters__button--active');
  }
  activeButton.classList.add('img-filters__button--active');
};

const buttonPopularNewHandle = (evt) => {
  evt.preventDefault();
  changeActiveButton(buttonPopular);
  renderPictures(photosFormServer);
};

const buttonNewHandle = (evt) => {
  evt.preventDefault();
  changeActiveButton(buttonNew);
  renderPictures(getRandomElement(photosFormServer, 10));
};

const buttonDiscussedHandle = (evt) => {
  evt.preventDefault();
  changeActiveButton(buttonDiscussed);
  const photosFormServerCopy = photosFormServer.slice();
  renderPictures(photosFormServerCopy.sort(photoDiscusseComparator));
};

buttonPopular.addEventListener('click', buttonPopularNewHandle);
buttonNew.addEventListener('click', buttonNewHandle);
buttonDiscussed.addEventListener('click', buttonDiscussedHandle);


const renderPhotos = (data) => {
  photosFormServer = data;
  filters.classList.remove('img-filters--inactive');
  renderPictures(photosFormServer);
};

getPosts()
  .then(renderPhotos);
