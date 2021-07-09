'use strict';

(function () {

  let photosFormServer;

  const filtersForm = document.querySelector('.img-filters__form');
  const buttons = filtersForm.querySelectorAll('.img-filters__button');
  const buttonPopular = filtersForm.querySelector('#filter-popular');
  const buttonNew = filtersForm.querySelector('#filter-new');
  const buttonDiscussed = filtersForm.querySelector('#filter-discussed');
  const filters = document.querySelector('.img-filters');

  const photoDiscusseComparator = function (left, right) {
    return right.comments.length - left.comments.length;
  };

  const changeActiveButton = function (activeButton) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('img-filters__button--active');
    }
    activeButton.classList.add('img-filters__button--active');
  };

  const buttonPopularNewHandle = function (evt) {
    evt.preventDefault();
    changeActiveButton(buttonPopular);
    window.render(photosFormServer);
  };

  const buttonNewHandle = function (evt) {
    evt.preventDefault();
    changeActiveButton(buttonNew);
    window.render(window.utils.getRandomElement(photosFormServer, 10));
  };

  const buttonDiscussedHandle = function (evt) {
    evt.preventDefault();
    changeActiveButton(buttonDiscussed);
    const photosFormServerCopy = photosFormServer.slice();
    window.render(photosFormServerCopy.sort(photoDiscusseComparator));
  };

  buttonPopular.addEventListener('click', buttonPopularNewHandle);
  buttonNew.addEventListener('click', buttonNewHandle);
  buttonDiscussed.addEventListener('click', buttonDiscussedHandle);


  const onLoad = function (data) {
    photosFormServer = data;
    filters.classList.remove('img-filters--inactive');
    window.render(photosFormServer);
  };

  window.backend.load(onLoad, window.backend.errorHandler);

})();
