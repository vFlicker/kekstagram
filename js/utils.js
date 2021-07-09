const ESC_KEYCODE = 27;

const isEscKeycode = (keycode) => keycode === ESC_KEYCODE;

const getRandomElement = (array, length) => {
  const copyArray = array.slice();

  if (copyArray.length < length) {
    length = copyArray.length;
  }

  let currentIndex = copyArray.length;
  let temporaryValue;
  let randomIndex;

  // Пока остаются элементы для перетасовки
  while (currentIndex) {

    // Выбирается последний элемент
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // И меняем его с текущим элементом
    temporaryValue = copyArray[currentIndex];
    copyArray[currentIndex] = copyArray[randomIndex];
    copyArray[randomIndex] = temporaryValue;
  }

  copyArray.length = length;
  return copyArray;
};

export {
  isEscKeycode,
  getRandomElement
};
