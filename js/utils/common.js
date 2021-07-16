const ESC_KEYCODE = 27;

const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (items) => {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index--) {
    const randomIndex = getRandomInteger(0, index);
    const swap = shuffledItems[index];
    shuffledItems[index] = shuffledItems[randomIndex];
    shuffledItems[randomIndex] = swap;
  }

  return shuffledItems;
};

export const isEscEvent = (keycode) => keycode === ESC_KEYCODE;

export const sortByDiscussed = (firstPost, secondPost) => secondPost.comments.length - firstPost.comments.length;
