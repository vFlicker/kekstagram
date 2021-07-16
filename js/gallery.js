import {getPosts} from './api.js';
import {renderPictures} from './render-pictures.js';
import {getRandomElement, sortByDiscussed} from './utils/common.js';
import {SortType} from './const.js';

const filterElement = document.querySelector('.img-filters');
const formElement = filterElement.querySelector('.img-filters__form');
let currentSortType = SortType.DEFAULT;
let photosFormServer = [];

const formItemClickHandler = (evt) => {
  evt.preventDefault();

  const newSortType = evt.target.id;

  if (newSortType === currentSortType) {
    return;
  }

  formElement
    .querySelector(`#${currentSortType}`)
    .classList.remove('img-filters__button--active');

  formElement
    .querySelector(`#${newSortType}`)
    .classList.add('img-filters__button--active');

  currentSortType = newSortType;

  switch (currentSortType) {
    case SortType.RANDOM:
      renderPictures(getRandomElement(photosFormServer, 10));
      break;
    case SortType.DISCUSSED:
      renderPictures(photosFormServer.slice().sort(sortByDiscussed));
      break;
    default:
      renderPictures(photosFormServer);
      break;
  }
};

formElement.addEventListener('click', formItemClickHandler);

const renderPhotos = (data) => {
  photosFormServer = data;
  filterElement.classList.remove('img-filters--inactive');
  renderPictures(photosFormServer);
};

getPosts()
  .then(renderPhotos);
