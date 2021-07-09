'use strict';

(function () {

  var photosFormServer;

  var filtersForm = document.querySelector('.img-filters__form');
  var buttons = filtersForm.querySelectorAll('.img-filters__button');
  var buttonPopular = filtersForm.querySelector('#filter-popular');
  var buttonNew = filtersForm.querySelector('#filter-new');
  var buttonDiscussed = filtersForm.querySelector('#filter-discussed');
  var filters = document.querySelector('.img-filters');

  var photoDiscusseComparator = function (left, right) {
    return right.comments.length - left.comments.length;
  };

  var changeActiveButton = function (activeButton) {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('img-filters__button--active');
    }
    activeButton.classList.add('img-filters__button--active');
  };

  var buttonPopularNewHandle = function (evt) {
    evt.preventDefault();
    changeActiveButton(buttonPopular);
    window.render(photosFormServer);
  };

  var buttonNewHandle = function (evt) {
    evt.preventDefault();
    changeActiveButton(buttonNew);
    window.render(window.utils.getRandomElement(photosFormServer, 10));
  };

  var buttonDiscussedHandle = function (evt) {
    evt.preventDefault();
    changeActiveButton(buttonDiscussed);
    var photosFormServerCopy = photosFormServer.slice();
    window.render(photosFormServerCopy.sort(photoDiscusseComparator));
  };

  buttonPopular.addEventListener('click', buttonPopularNewHandle);
  buttonNew.addEventListener('click', buttonNewHandle);
  buttonDiscussed.addEventListener('click', buttonDiscussedHandle);


  var onLoad = function (data) {
    photosFormServer = data;
    filters.classList.remove('img-filters--inactive');
    window.render(photosFormServer);
  };

  window.backend.load(onLoad, window.backend.errorHandler);

})();
