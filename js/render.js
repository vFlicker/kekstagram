import {addContentToBigPicture, openBigPicture} from './bigPicture.js';

const pictureTemplate = document.querySelector('#picture');
const picturesPreviewList = document.querySelector('.pictures');
let photosData;

const renderBackgroundPhotos = (content) => {
  const element = pictureTemplate.content.cloneNode(true);

  const contentElement = element.querySelector('.picture');
  contentElement.querySelector('.picture__img').src = content.url;
  contentElement.querySelector('.picture__likes').textContent = content.likes;
  contentElement.querySelector('.picture__comments').textContent = content.comments.length;

  return element;
};

const render = (data) => {
  photosData = data;

  const fragment = document.createDocumentFragment();
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((element) => {
    element.remove();
  });

  data.forEach((element) => {
    fragment.appendChild(renderBackgroundPhotos(element));
  });

  picturesPreviewList.appendChild(fragment);
};

const picturePreviewHandler = (evt) => {
  const pictureSrc = evt.target.getAttribute('src');

  photosData.find((photoData) => {
    if (photoData.url === pictureSrc) {
      addContentToBigPicture(photoData);
      openBigPicture();
    }
  });
};

picturesPreviewList.addEventListener('click', picturePreviewHandler);

export {
  render
};
