'use strict';

(function () {

var pictureTemplate = document.querySelector('#picture');
  var picturesPreviewList = document.querySelector('.pictures');
  var photosData;

  var renderBackgroundPhotos = function (content) {
    var element = pictureTemplate.content.cloneNode(true);

    var contentElement = element.querySelector('.picture');
    contentElement.querySelector('.picture__img').src = content.url;
    contentElement.querySelector('.picture__likes').textContent = content.likes;
    contentElement.querySelector('.picture__comments').textContent = content.comments.length;

    return element;
  }

  window.render = function (data) {
    photosData = data;

    var fragment = document.createDocumentFragment();
    var pictures = document.querySelectorAll('.picture');

    pictures.forEach(function (element) {
      element.remove();
    });

    data.forEach(function (element) {
      fragment.appendChild(renderBackgroundPhotos(element));
    });

    picturesPreviewList.appendChild(fragment);
  };

  var picturePreviewHandler = function (evt) {
    var pictureSrc = evt.target.getAttribute('src');

    photosData.find(function (photoData) {
      if (photoData.url === pictureSrc) {
        window.bigPicture.addContent(photoData);
        window.bigPicture.open();
      }
    });
  };

  picturesPreviewList.addEventListener('click', picturePreviewHandler);

})();
