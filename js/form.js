'use strict';

(() => {

  // Форма редактирование изображение
  const uploadForm = document.querySelector('.img-upload__form');
  const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  const buttonUploadOverlayClose = uploadForm.querySelector('.img-upload__cancel');
  const effectLevel = document.querySelector('.effect-level');
  const hashtagsInput = uploadForm.querySelector('.text__hashtags');
  const errorTextInput = uploadForm.querySelector('.input-error__text');
  const loadedPhoto = document.querySelector('.img-upload__preview img');
  let uploadedPhoto;

  // Поп-ап
  const onEditorPictureEscPress = (evt) => {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeEditorPicture();
      evt.target.value = '';
    }
  };

  const openEditorPicture = () => {
    uploadOverlay.classList.remove('hidden');
    buttonUploadOverlayClose.addEventListener('click', closeEditorPicture);
    document.addEventListener('keydown', onEditorPictureEscPress);
  };

  const closeEditorPicture = () => {
    uploadOverlay.classList.add('hidden');
    effectLevel.classList.add('hidden');
    buttonUploadOverlayClose.removeEventListener('click', closeEditorPicture);
    document.removeEventListener('keydown', onEditorPictureEscPress);
  };

  // Изменение размера фото
  const picturesScaleReduce = uploadForm.querySelector('.scale__control--smaller');
  const picturesScaleIncrease = uploadForm.querySelector('.scale__control--bigger');
  const picturesScale = uploadForm.querySelector('.scale__control--value');
  let picturesScaleValue = Number(picturesScale.value.slice(0, -1));

  const onPicturesScaleReduce = () => {
    if (picturesScaleValue > 25) {
      picturesScaleValue = picturesScaleValue - 25;
      loadedPhoto.style.width = `${picturesScaleValue}%`;
      picturesScale.value = `${picturesScaleValue}%`;
    }
  };

  const onPicturesScaleIncrease = () => {
    if (picturesScaleValue < 100) {
      picturesScaleValue = picturesScaleValue + 25;
      loadedPhoto.style.width = `${picturesScaleValue}%`;
      picturesScale.value = `${picturesScaleValue}%`;
    }
  };

  picturesScaleReduce.addEventListener('click', onPicturesScaleReduce);
  picturesScaleIncrease.addEventListener('click', onPicturesScaleIncrease);


  // Наложение маски
  const effectNames = [
    'effects__preview--none',
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat',
  ];

  const effectsDefStyles = [
    'none',
    'grayscale(0.2)',
    'sepia(0.2)',
    'invert(20%)',
    'blur(2px)',
    'brightness(40%)',
  ];

  // Интенсивность наложения
  const changeSaturationEffect = () => {
    const saturationEffectLine = effectLevel.querySelector('.effect-level__line');
    const saturationEffectPin = effectLevel.querySelector('.effect-level__pin');
    const saturationEffectLineDepth = effectLevel.querySelector('.effect-level__depth');

    const constyEffect = (sliderValue) => {

      // !!!!!!!!!!!!!!!!!!!!!!!
      // !!! Сделать красиво !!!
      // !!!!!!!!!!!!!!!!!!!!!!!


      if (uploadedPhoto.classList.contains(effectNames[0])) {
        uploadedPhoto.style.filter = 'none';
      }

      if (uploadedPhoto.classList.contains(effectNames[1])) {
        uploadedPhoto.style.filter = `grayscale(${sliderValue * 0.01})`;
      }

      if (uploadedPhoto.classList.contains(effectNames[2])) {
        uploadedPhoto.style.filter = `sepia(${sliderValue * 0.01})`;
      }

      if (uploadedPhoto.classList.contains(effectNames[3])) {
        uploadedPhoto.style.filter = `invert(${sliderValue}%)`;
      }

      if (uploadedPhoto.classList.contains(effectNames[4])) {
        uploadedPhoto.style.filter = `blur(${sliderValue * 0.1}px)`;
      }

      if (uploadedPhoto.classList.contains(effectNames[5])) {
        if (sliderValue < 2) {
          sliderValue = 2;
        } else {
          uploadedPhoto.style.filter = `brightness(${sliderValue * 2}%)`;
        }
      }
    };

    return {
      effectLevelLine: saturationEffectLine,
      effectLevelPin: saturationEffectPin,
      effectLevelLineDepth: saturationEffectLineDepth,
      consty: constyEffect,
    };
  };

  const maskEffect = (effectName, effectsDefStyle) => {
    uploadedPhoto = document.querySelector('.img-upload__preview img');
    for (let i = 0; i < 6; i++) {
      uploadedPhoto.classList.remove(effectNames[i]);
    }

    uploadedPhoto.classList.add(effectName);
    uploadedPhoto.style.filter = effectsDefStyle;

    !uploadedPhoto.classList.contains(effectNames[0]) ? effectLevel.classList.remove('hidden') : effectLevel.classList.add('hidden');

    window.dnd.initSlider(changeSaturationEffect);
  };

  const picturesEffectArray = [...document.querySelectorAll('.effects__radio')];


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!! Попробовать сделать на массивах !!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  for (let i = 0; i < picturesEffectArray.length; i++) {
    picturesEffectArray[i].addEventListener('click', (evt) => {
      switch (evt.currentTarget.value) {
        case 'none':
          maskEffect(effectNames[0], effectsDefStyles[0]);
          break;
        case 'chrome':
          maskEffect(effectNames[1], effectsDefStyles[1]);
          break;
        case 'sepia':
          maskEffect(effectNames[2], effectsDefStyles[2]);
          break;
        case 'marvin':
          maskEffect(effectNames[3], effectsDefStyles[3]);
          break;
        case 'phobos':
          maskEffect(effectNames[4], effectsDefStyles[4]);
          break;
        case 'heat':
          maskEffect(effectNames[5], effectsDefStyles[5]);
          break;
      }
    });
  }


  // Поле ввода
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!(checkFieldsPresence() && checkCharacters() && checkPresenceHashtags())) {
      return;
    } else {
      window.backend.save(new FormData(uploadForm), (response) => {


        // Скрыть форму если всё ок
        // Указать URL как в "Код и магия."


        // setup.classList.add('hidden');
        console.log(response);
      }, window.backend.errorHandler);
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
  //     window.backend.save(new FormData(form), response) => {
  //         setup.classList.add('hidden');
  //         console.log(response);
  //     }, window.backend.onError);
  //     evt.preventDefault();
  // });

  window.form = {
    openEditorPicture: openEditorPicture,
  };


})();
