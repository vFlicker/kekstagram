import {isEscEvent} from '../utils/common.js';
import {DOM} from '../utils/DOM.js';

const COMMENT_COUNT_PER_STEP = 5;
let renderedCommentCount = COMMENT_COUNT_PER_STEP;
let comments = [];

const bodyElement = document.querySelector('body');
const pictureSectionElement = bodyElement.querySelector('.big-picture');
const imageElement = pictureSectionElement.querySelector('.big-picture__img img');
const socialCaptionElement = pictureSectionElement.querySelector('.social__caption');
const likeCounterElement = pictureSectionElement.querySelector('.likes-count');
const commentListElement = pictureSectionElement.querySelector('.social__comments');
const closeButtonElement = pictureSectionElement.querySelector('.big-picture__cancel');
const commentCounterElement = pictureSectionElement.querySelector('.social__comment-count');
const loadMoreButtonElement = pictureSectionElement.querySelector('.social__comments-loader');

const escPressHandler = (evt) => {
  if (isEscEvent(evt.keyCode)) {
    closeButtonClickHandler(); // eslint-disable-line no-use-before-define
  }
};

const closeButtonClickHandler = () => {
  hideBigPicture(); // eslint-disable-line no-use-before-define
};

const loadMoreButtonClickHandler = (evt) => {
  evt.preventDefault();

  const commentCount = comments.length;
  const renderTo = Math.min(commentCount, renderedCommentCount + COMMENT_COUNT_PER_STEP);

  renderComments(renderedCommentCount, renderTo); // eslint-disable-line no-use-before-define

  renderedCommentCount = renderTo;

  if (commentCount <= renderedCommentCount) {
    removeLoadMoreButton(); // eslint-disable-line no-use-before-define
  }

  updateCommentCounter(); // eslint-disable-line no-use-before-define
};

const hideBigPicture = () => {
  DOM.unlockScroll();
  DOM.hideElement(pictureSectionElement);
  closeButtonElement.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', escPressHandler);
};

const openBigPicture = () => {
  DOM.lockScroll();
  DOM.showElement(pictureSectionElement);
  closeButtonElement.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', escPressHandler);
};

const createComment = (comment) => {
  const commentTemplate = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');

  const commentContainerElement = commentTemplate.cloneNode(true);
  const avatarElement = commentContainerElement.querySelector('.social__picture');
  const textElement = commentContainerElement.querySelector('.social__text');

  avatarElement.src = comment.avatar;
  avatarElement.alt = comment.name;
  textElement.textContent = comment.message;

  return commentContainerElement;
};

const renderComments = (from, to) => {
  const commentListFragment = document.createDocumentFragment();

  comments
    .slice(from, to)
    .forEach((comment) => commentListFragment.appendChild(createComment(comment)));

  commentListElement.appendChild(commentListFragment);
};

const removeComments = () => commentListElement.innerHTML = '';

const updateCommentCounter = () => {
  const totalComments = comments.length;
  commentCounterElement.textContent = `${renderedCommentCount} из ${totalComments} комментариев`;
};

const removeLoadMoreButton = () => {
  DOM.hideElement(loadMoreButtonElement);
  loadMoreButtonElement.removeEventListener('click', loadMoreButtonClickHandler);
};

const addComments = () => {
  const commentCount = comments.length;

  removeComments();
  renderComments(0, COMMENT_COUNT_PER_STEP);

  if (commentCount > COMMENT_COUNT_PER_STEP) {
    renderedCommentCount = COMMENT_COUNT_PER_STEP;
    DOM.showElement(loadMoreButtonElement);
    loadMoreButtonElement.addEventListener('click', loadMoreButtonClickHandler);
  } else {
    renderedCommentCount = commentCount;
    removeLoadMoreButton();
  }

  updateCommentCounter();
};

export const addContentToBigPicture = (data) => {
  comments = [...data.comments];

  imageElement.src = data.url;
  socialCaptionElement.textContent = data.description;
  likeCounterElement.textContent = data.likes;

  addComments();
  openBigPicture();
};
