'use strict';

(function () {

    var bigPicture = document.querySelector('.big-picture');
    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
    var bigPictureLikes = bigPicture.querySelector('.likes-count');
    var commentsList = bigPicture.querySelector('.social__comments');
    var buttonBigPictureClose = bigPicture.querySelector('.big-picture__cancel');
    var socialCommentCount = bigPicture.querySelector('.social__comment-count');
    var socialCommentLoader = bigPicture.querySelector('.social__comments-loader');
    var comments;
    var clonedComments;
    var COMMENT_COUNTER = 5;

    var onBigPictureEscPress = function (evt) {
        if (evt.keyCode === window.utils.ESC_KEYCODE) {
            closeBigPicture();
        }
    }

    var openBigPicture = function () {
        bigPicture.classList.remove('hidden');
        buttonBigPictureClose.addEventListener('click', closeBigPicture);
        document.addEventListener('keydown', onBigPictureEscPress);
    }

    var closeBigPicture = function () {
        bigPicture.classList.add('hidden');
        buttonBigPictureClose.removeEventListener('click', closeBigPicture);
        document.removeEventListener('keydown', onBigPictureEscPress);
    }

    var createComment = function (comentData) {
        var element = document.querySelector('#comment').content.cloneNode(true);

        var contentElement = element.querySelector('.social__comment');
        var avatar = contentElement.querySelector('.social__picture');
        var comment = contentElement.querySelector('.social__text');

        avatar.src = comentData.avatar;
        avatar.alt = comentData.name;
        comment.textContent = comentData.message;

        return element;
    };

    var showCommentCount = function () {
        var shownСomments = comments.length - clonedComments.length;
        var totalСomments = comments.length;
        socialCommentCount.textContent = `${shownСomments} из ${totalСomments} комментариев`;
    }

    var addComments = function (array, lastIndex) {
        var fragment = document.createDocumentFragment();
        var firstIndex = 0;

        array
            .splice(firstIndex, lastIndex)
            .forEach(function (element) {
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

    var socialCommentLoaderHandle = function (evt) {
        evt.preventDefault();
        addComments(clonedComments, COMMENT_COUNTER);
    }

    var uploadComments = function (amount) {
        clonedComments = comments.slice();
        commentsList.textContent = '';

        addComments(clonedComments, amount);
        socialCommentLoader.addEventListener('click', socialCommentLoaderHandle);
    };

    var addContentToBigPicture = function (item) {
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