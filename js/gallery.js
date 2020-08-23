'use strict';

(function () {

    // Создали изображания
    var renderBackgroundPhotos = function (content) {
        var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
        var contentElement = pictureTemplate.cloneNode(true);

        contentElement.querySelector('.picture__img').src = content.url;
        contentElement.querySelector('.picture__likes').textContent = content.likes;
        contentElement.querySelector('.picture__comments').textContent = content.comments.length;

        contentElement.addEventListener('click', function() {
            window.preview.openBigPicture();
            window.preview.addContentToBigPicture(content);
        })
        
        return contentElement;
    }

    // Отобразили фоновые изображания
    var showBackgroundPhotos = function () {
        var similarListListElement = document.querySelector('.pictures');
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < 25; i++) {
            fragment.appendChild(renderBackgroundPhotos(window.data.photosInfo[i]));
        }

        similarListListElement.appendChild(fragment);
    }

    showBackgroundPhotos();

})();