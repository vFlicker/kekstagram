'use strict';

(() => {

  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const commentsList = bigPicture.querySelector('.social__comments');
  const buttonBigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const socialCommentLoader = bigPicture.querySelector('.social__comments-loader');
  let comments;
  let clonedComments;
  const COMMENT_COUNTER = 5;

  const onBigPictureEscPress = (evt) => {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPicture();
    }
  }

  const openBigPicture = () => {
    bigPicture.classList.remove('hidden');
    buttonBigPictureClose.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onBigPictureEscPress);
  }

  const closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    buttonBigPictureClose.removeEventListener('click', closeBigPicture);
    document.removeEventListener('keydown', onBigPictureEscPress);
  }

  const createComment = (comentData) => {
    const element = document.querySelector('#comment').content.cloneNode(true);

    const contentElement = element.querySelector('.social__comment');
    const avatar = contentElement.querySelector('.social__picture');
    const comment = contentElement.querySelector('.social__text');

    avatar.src = comentData.avatar;
    avatar.alt = comentData.name;
    comment.textContent = comentData.message;

    return element;
  };

  const showCommentCount = () => {
    const shownСomments = comments.length - clonedComments.length;
    const totalСomments = comments.length;
    socialCommentCount.textContent = `${shownСomments} из ${totalСomments} комментариев`;
  }

  const addComments = (array, lastIndex) => {
    const fragment = document.createDocumentFragment();
    const firstIndex = 0;

    array
      .splice(firstIndex, lastIndex)
      .forEach((element) => {
        fragment.appendChild(createComment(element));
        commentsList.appendChild(fragment);
      });

    if (array.length === firstIndex) {
      socialCommentLoader.classList.add('hidden');
      socialCommentLoader.removeEventListener('click', socialCommentLoaderHandle);
    } else {
      socialCommentLoader.classList.remove('hidden');
    }

    showCommentCount();
  };

  const socialCommentLoaderHandle = (evt) => {
    evt.preventDefault();
    addComments(clonedComments, COMMENT_COUNTER);
  }

  const uploadComments = (amount) => {
    clonedComments = comments.slice();
    commentsList.textContent = '';

    addComments(clonedComments, amount);
    socialCommentLoader.addEventListener('click', socialCommentLoaderHandle);
  };

  const addContentToBigPicture = (item) => {
    comments = item.comments;

    bigPictureImg.src = item.url;
    bigPictureSocialCaption.textContent = item.description;
    bigPictureLikes.textContent = item.likes;

    uploadComments(COMMENT_COUNTER);
  }

  window.bigPicture = {
    open: openBigPicture,
    addContent: addContentToBigPicture
  }

})();
