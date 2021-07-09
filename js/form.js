'use strict';

(function () {

  // Форма редактирование изображение
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  var buttonUploadOverlayClose = uploadForm.querySelector('.img-upload__cancel');
  var effectLevel = document.querySelector('.effect-level');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');
  var errorTextInput = uploadForm.querySelector('.input-error__text');
  var loadedPhoto = document.querySelector('.img-upload__preview img');
  var uploadedPhoto;

  // Поп-ап
  var onEditorPictureEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeEditorPicture();
      evt.target.value = '';
    }
  }

  var openEditorPicture = function () {
    uploadOverlay.classList.remove('hidden');
    buttonUploadOverlayClose.addEventListener('click', closeEditorPicture);
    document.addEventListener('keydown', onEditorPictureEscPress);
  }

  var closeEditorPicture = function () {
    uploadOverlay.classList.add('hidden');
    effectLevel.classList.add('hidden');
    buttonUploadOverlayClose.removeEventListener('click', closeEditorPicture);
    document.removeEventListener('keydown', onEditorPictureEscPress);
  }

  // Изменение размера фото
  var picturesScaleReduce = uploadForm.querySelector('.scale__control--smaller');
  var picturesScaleIncrease = uploadForm.querySelector('.scale__control--bigger');
  var picturesScale = uploadForm.querySelector('.scale__control--value');
  var picturesScaleValue = Number(picturesScale.value.slice(0, -1));

  var onPicturesScaleReduce = function () {
    if (picturesScaleValue > 25) {
      picturesScaleValue = picturesScaleValue - 25;
      loadedPhoto.style.width = picturesScaleValue + '%';
      picturesScale.value = picturesScaleValue + '%';
    }
  }

  var onPicturesScaleIncrease = function () {
    if (picturesScaleValue < 100) {
      picturesScaleValue = picturesScaleValue + 25;
      loadedPhoto.style.width = picturesScaleValue + '%';
      picturesScale.value = picturesScaleValue + '%';
    }
  }

  picturesScaleReduce.addEventListener('click', onPicturesScaleReduce);
  picturesScaleIncrease.addEventListener('click', onPicturesScaleIncrease);


  // Наложение маски
  var effectNames = [
    'effects__preview--none',
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  ];

  var effectsDefStyles = [
    'none',
    'grayscale(0.2)',
    'sepia(0.2)',
    'invert(20%)',
    'blur(2px)',
    'brightness(40%)'
  ];

  // Интенсивность наложения
  var changeSaturationEffect = function () {
    var saturationEffectLine = effectLevel.querySelector('.effect-level__line');
    var saturationEffectPin = effectLevel.querySelector('.effect-level__pin');
    var saturationEffectLineDepth = effectLevel.querySelector('.effect-level__depth');

    var varyEffect = function (sliderValue) {

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
    }

    return {
      effectLevelLine: saturationEffectLine,
      effectLevelPin: saturationEffectPin,
      effectLevelLineDepth: saturationEffectLineDepth,
      vary: varyEffect
    };
  }

  var maskEffect = function (effectName, effectsDefStyle) {
    uploadedPhoto = document.querySelector('.img-upload__preview img');
    for (var i = 0; i < 6; i++) {
      uploadedPhoto.classList.remove(effectNames[i]);
    }

    uploadedPhoto.classList.add(effectName);
    uploadedPhoto.style.filter = effectsDefStyle;

    !uploadedPhoto.classList.contains(effectNames[0]) ? effectLevel.classList.remove('hidden') : effectLevel.classList.add('hidden');

    window.dnd.initSlider(changeSaturationEffect);
  }

  var picturesEffectArray = [...document.querySelectorAll('.effects__radio')];


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!! Попробовать сделать на массивах !!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  for (var i = 0; i < picturesEffectArray.length; i++) {
    picturesEffectArray[i].addEventListener('click', function (evt) {
      switch (evt.currentTarget.value) {
        case 'none':
          maskEffect(effectNames[0], effectsDefStyles[0])
          break;
        case 'chrome':
          maskEffect(effectNames[1], effectsDefStyles[1])
          break;
        case 'sepia':
          maskEffect(effectNames[2], effectsDefStyles[2])
          break;
        case 'marvin':
          maskEffect(effectNames[3], effectsDefStyles[3]);
          break;
        case 'phobos':
          maskEffect(effectNames[4], effectsDefStyles[4])
          break;
        case 'heat':
          maskEffect(effectNames[5], effectsDefStyles[5])
          break;
      }
    });
  };


  // Поле ввода
  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (!(checkFieldsPresence() && checkCharacters() && checkPresenceHashtags())) {
      return;
    } else {
      window.backend.save(new FormData(uploadForm), function (response) {


        // Скрыть форму если всё ок
        // Указать URL как в "Код и магия."



        // setup.classList.add('hidden');
        console.log(response);
      }, window.backend.errorHandler);
    }

    hashtagsInput.addEventListener('input', isValid);
  });

  var checkCharacters = function () {
    if (hashtagsInput.validity.tooShort) {
      hashtagsInput.classList.add('input-error');
      errorTextInput.innerHTML = 'Мало букв';
      return false;
    }

    return true;
  }

  var checkFieldsPresence = function () {
    if (hashtagsInput.validity.valueMissing) {
      hashtagsInput.classList.add('input-error');
      errorTextInput.innerHTML = 'Поле должно быть заполненно';
      return false;
    }

    return true;
  }

  var checkPresenceHashtags = function () {
    var str = hashtagsInput.value.replace(/ +/g, ' ').trim();
    var wordsArr = str.split(" ");

    for (var i = 0; i < wordsArr.length; i++) {
      if (wordsArr[i][0] !== '#') {
        hashtagsInput.classList.add('input-error');
        errorTextInput.innerHTML = 'Хэш-тег должен начинаться со знака &laquo;#&raquo;';
        return false;
      } else {
        hashtagsInput.classList.remove("input-error");
      }
    }

    return true;
  }

  var isValid = function () {
    if (hashtagsInput.validity.valid && checkPresenceHashtags()) {
      hashtagsInput.classList.remove('input-error');
      errorTextInput.innerHTML = '';
    }
  }

  // form.addEventListener('submit', function (evt) {
  //     window.backend.save(new FormData(form), function(response) {
  //         setup.classList.add('hidden');
  //         console.log(response);
  //     }, window.backend.onError);
  //     evt.preventDefault();
  // });

  window.form = {
    openEditorPicture: openEditorPicture
  }



})();
