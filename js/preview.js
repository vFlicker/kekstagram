'use strict';

(() => {

  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = bigPicture.querySelector('.big-picture__social .likes-count');
  const bigPictureCommentCount = bigPicture.querySelector('.social__comment-count .comments-count');
  const bigPictureComments = bigPicture.querySelectorAll('.social__comment .social__text');
  const bigPictureSocialCaption = bigPicture.querySelector('.big-picture__social .social__caption');
  const buttonBigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  const hideCommentCount = document.querySelector('.social__comment-count');
  const hideCommentLoader = document.querySelector('.social__comments-loader');

  // Скрываем счётчика комментариев и загрузки новых комментариев
  hideCommentCount.classList.add('visually-hidden');
  hideCommentLoader.classList.add('visually-hidden');

  // Показать большое изображение
  const openBigPicture = () => {
    bigPicture.classList.remove('hidden');
    buttonBigPictureClose.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onBigPictureEscPress);
  }

  const onBigPictureEscPress = (evt) => {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPicture();
    }
  }

  const closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    buttonBigPictureClose.removeEventListener('click', closeBigPicture);
    document.removeEventListener('keydown', onBigPictureEscPress);
  }

  // Добавить информацию
  const addContentToBigPicture = (item) => {
    bigPictureImg.src = item.url;
    bigPictureLikes.textContent = item.likes;
    bigPictureCommentCount.textContent = item.comments.length;
    bigPictureSocialCaption.textContent = item.description;
    for (let i = 0; i < 2; i++) {
      bigPictureComments[i].textContent = item.comments[i];
    }
  }

  window.preview = {
    openBigPicture: openBigPicture,
    addContentToBigPicture: addContentToBigPicture
  }

})();
