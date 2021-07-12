import {save, errorHandler} from './backend.js';

// Форма редактирование изображение
const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const errorTextInput = uploadForm.querySelector('.input-error__text');

// Поле ввода
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!(checkFieldsPresence() && checkCharacters() && checkPresenceHashtags())) {
    return;
  } else {
    save(new FormData(uploadForm), (response) => {


      // Скрыть форму если всё ок
      // Указать URL как в "Код и магия."


      // setup.classList.add('hidden');
      console.log(response);
    }, errorHandler);
  }

  hashtagsInput.addEventListener('input', isValid);
});

const checkCharacters = () => {
  if (hashtagsInput.validity.tooShort) {
    hashtagsInput.classList.add('input-error');
    errorTextInput.innerHTML = 'Мало букв';
    return false;
  }

  return true;
};

const checkFieldsPresence = () => {
  if (hashtagsInput.validity.valueMissing) {
    hashtagsInput.classList.add('input-error');
    errorTextInput.innerHTML = 'Поле должно быть заполненно';
    return false;
  }

  return true;
};

const checkPresenceHashtags = () => {
  const str = hashtagsInput.value.replace(/ +/g, ' ').trim();
  const wordsArr = str.split(' ');

  for (let i = 0; i < wordsArr.length; i++) {
    if (wordsArr[i][0] !== '#') {
      hashtagsInput.classList.add('input-error');
      errorTextInput.innerHTML = 'Хэш-тег должен начинаться со знака &laquo;#&raquo;';
      return false;
    } else {
      hashtagsInput.classList.remove('input-error');
    }
  }

  return true;
};

const isValid = () => {
  if (hashtagsInput.validity.valid && checkPresenceHashtags()) {
    hashtagsInput.classList.remove('input-error');
    errorTextInput.innerHTML = '';
  }
};

// form.addEventListener('submit', (evt) => {
//     save(new FormData(form), response) => {
//         setup.classList.add('hidden');
//         console.log(response);
//     }, errorHandler);
//     evt.preventDefault();
// });
