const formElement = document.querySelector('.img-upload__form');
const hashtagElement = formElement.querySelector('.text__hashtags');
const commentElement = formElement.querySelector('.text__description');
const submitElement = formElement.querySelector('.img-upload__submit');

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const hashtagRegexp = new RegExp('^#[A-Za-zА-Яа-я0-9]{1,19}$');

const isHashtegs = (input) => {
  const hashtegs = input.value.split(' ');

  if (hashtegs.length > MAX_HASHTAG_COUNT) {
    input.setCustomValidity(`Максимальное количество хэштегов — ${MAX_HASHTAG_COUNT}`);
    return false;
  }

  if (new Set(hashtegs).size !== hashtegs.length) {
    input.setCustomValidity('Хэштеги должны быть уникальными');
    return false;
  }

  for (const hashteg of hashtegs) {
    if (hashteg === '') {
      input.setCustomValidity('Хэштеги разделяются пробелами');
      return false;
    }

    if (hashteg[0] !== '#') {
      input.setCustomValidity('Хэштег должен начинаться с #');
      return false;
    }

    if (hashteg.length < MIN_HASHTAG_LENGTH) {
      input.setCustomValidity(`Минимальная длинна хэштега ${MIN_HASHTAG_LENGTH} символа`);
      return false;
    }

    if (hashteg.length > MAX_HASHTAG_LENGTH) {
      input.setCustomValidity(`Максимальная длинна хэштега ${MAX_HASHTAG_LENGTH} символа`);
      return false;
    }

    if (!hashtagRegexp.test(hashteg)) {
      input.setCustomValidity('Cтрока после # не может содержать спецсимволов');
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

  if (!isHashtegs(input)) {
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
