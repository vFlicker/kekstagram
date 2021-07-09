'use strict';

(function () {

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избив. Как можно было поймать такой неудачный момент?!'
  ];

  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вамии отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function arrayRowCount(arr) {
    var num = Math.random();
    if (num < 0.5) {
      return arrayRandElement(arr);
    }

    return arrayRandElement(arr) + ' ' + arrayRandElement(arr);
  }

  function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  }
  var photosInfo = [];
  for (var i = 1; i < 26; i++) {
    photosInfo.push({
      url: `photos/${i}.jpg`,
      likes: getRandomIntInclusive(15, 200),
      comments: [arrayRowCount(COMMENTS), arrayRowCount(COMMENTS)],
      description: arrayRandElement(DESCRIPTIONS)
    })
  }

  window.data = {
    photosInfo: photosInfo
  }

})();
