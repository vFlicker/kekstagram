import {isEscEvent, hideElement, showElement} from './util.js';

const COMMENT_COUNT_PER_STEP = 5;
let renderedComentCount = COMMENT_COUNT_PER_STEP;
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
  bodyElement.classList.remove('scroll-lock');
  hideElement(pictureSectionElement);
  closeButtonElement.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', escPressHandler);
};

const loadMoreButtonClickHandler = (evt) => {
  evt.preventDefault();

  const commentCount = comments.length;
  const renderTo = Math.min(commentCount, renderedComentCount + COMMENT_COUNT_PER_STEP);

  renderComments(renderedComentCount, renderTo); // eslint-disable-line no-use-before-define

  renderedComentCount = renderTo;

  if (commentCount <= renderedComentCount) {
    removeloadMoreButton(); // eslint-disable-line no-use-before-define
  }

  updateCommentCounter(); // eslint-disable-line no-use-before-define
};


const openBigPicture = () => {
  bodyElement.classList.add('scroll-lock');
  showElement(pictureSectionElement);
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
  const totalСomments = comments.length;
  commentCounterElement.textContent = `${renderedComentCount} из ${totalСomments} комментариев`;
};

const removeloadMoreButton = () => {
  hideElement(loadMoreButtonElement);
  loadMoreButtonElement.removeEventListener('click', loadMoreButtonClickHandler);
};

const addComments = () => {
  const commentCount = comments.length;
  const renderTo = Math.min(commentCount, renderedComentCount + COMMENT_COUNT_PER_STEP);

  removeComments();
  renderComments(0, renderTo);

  if (commentCount > COMMENT_COUNT_PER_STEP) {
    renderedComentCount = COMMENT_COUNT_PER_STEP;
    showElement(loadMoreButtonElement);
    loadMoreButtonElement.addEventListener('click', loadMoreButtonClickHandler);
  } else {
    renderedComentCount = commentCount;
    removeloadMoreButton();
  }

  updateCommentCounter();
};

const addContentToBigPicture = (data) => {
  comments = [...data.comments];

  imageElement.src = data.url;
  socialCaptionElement.textContent = data.description;
  likeCounterElement.textContent = data.likes;

  addComments();
  openBigPicture();
};

export {
  addContentToBigPicture
};
