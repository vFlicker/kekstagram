const formElement = document.querySelector('.img-upload__form');
const hashtagElement = formElement.querySelector('.text__hashtags');
const commentElement = formElement.querySelector('.text__description');
const submitElement = formElement.querySelector('.img-upload__submit');

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const hashtagRegexp = new RegExp('^#[A-Za-zА-Яа-я0-9]{1,19}$');

const isHashtags = (input) => {
  const hashtags = input.value.split(' ');

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    input.setCustomValidity(`Максимальное количество хэш-тегов — ${MAX_HASHTAG_COUNT}`);
    return false;
  }

  if (new Set(hashtags).size !== hashtags.length) {
    input.setCustomValidity('Хэштеги должны быть уникальными');
    return false;
  }

  for (const hashtag of hashtags) {
    if (hashtag === '') {
      input.setCustomValidity('Хэштеги разделяются пробелами');
      return false;
    }

    if (hashtag[0] !== '#') {
      input.setCustomValidity('Хэштег должен начинаться с #');
      return false;
    }

    if (hashtag.length < MIN_HASHTAG_LENGTH) {
      input.setCustomValidity(`Минимальная длинна хэш-тега ${MIN_HASHTAG_LENGTH} символа`);
      return false;
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      input.setCustomValidity(`Максимальная длинна хэш-тега ${MAX_HASHTAG_LENGTH} символа`);
      return false;
    }

    if (!hashtagRegexp.test(hashtag)) {
      input.setCustomValidity('Строка после # не может содержать спецсимволов');
      return false;
    }
  }

  return true;
};

const isMaxLength = (input, maxLength) => {
  const inputLength = input.value.length;

  if (inputLength > maxLength) {
    input.setCustomValidity(`Максимальное количество символов — ${maxLength}`);
    return true;
  }

  return false;
};

const hashtagInputHandler = (evt) => {
  const input = evt.target;

  if (!isHashtags(input)) {
    input.reportValidity();
    submitElement.disabled = true;
    return;
  }

  input.setCustomValidity('');
  submitElement.disabled = false;
};

const commentInputHandler = (evt) => {
  const input = evt.target;

  if (isMaxLength(input, MAX_COMMENT_LENGTH)) {
    input.reportValidity();
    submitElement.disabled = true;
    return;
  }

  input.setCustomValidity('');
  submitElement.disabled = false;
};

hashtagElement.addEventListener('input', hashtagInputHandler);
commentElement.addEventListener('input', commentInputHandler);

export const clearInputs = () => {
  hashtagElement.textContent = '';
  commentElement.textContent = '';
};
