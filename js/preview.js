'use strict';

(function () {

    var bigPicture = document.querySelector('.big-picture');
    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureLikes = bigPicture.querySelector('.big-picture__social .likes-count');
    var bigPictureCommentCount = bigPicture.querySelector('.social__comment-count .comments-count');
    var bigPictureComments = bigPicture.querySelectorAll('.social__comment .social__text');
    var bigPictureSocialCaption = bigPicture.querySelector('.big-picture__social .social__caption');
    var buttonBigPictureClose = bigPicture.querySelector('.big-picture__cancel');
    var hideCommentCount = document.querySelector('.social__comment-count');
    var hideCommentLoader = document.querySelector('.social__comments-loader');

    // Скрываем счётчика комментариев и загрузки новых комментариев
    hideCommentCount.classList.add('visually-hidden');
    hideCommentLoader.classList.add('visually-hidden');

    // Показать большое изображение
    var openBigPicture = function () {
        bigPicture.classList.remove('hidden');
        buttonBigPictureClose.addEventListener('click', closeBigPicture);
        document.addEventListener('keydown', onBigPictureEscPress);
    }

    var onBigPictureEscPress = function (evt) {
        if (evt.keyCode === window.utils.ESC_KEYCODE) {
            closeBigPicture();
        }
    }

    var closeBigPicture = function () {
        bigPicture.classList.add('hidden');
        buttonBigPictureClose.removeEventListener('click', closeBigPicture);
        document.removeEventListener('keydown', onBigPictureEscPress);
    }

    // Добавить информацию
    var addContentToBigPicture = function (item) {
        bigPictureImg.src = item.url;
        bigPictureLikes.textContent = item.likes;
        bigPictureCommentCount.textContent = item.comments.length;
        bigPictureSocialCaption.textContent = item.description;
        for (var i = 0; i < 2; i++) {
            bigPictureComments[i].textContent = item.comments[i];
        }
    }

    window.preview = {
        openBigPicture: openBigPicture,
        addContentToBigPicture: addContentToBigPicture
    }

})();