const URL_LOAD = 'https://22.javascript.pages.academy/kekstagram/data';
const URL_SAVE = 'https://22.javascript.pages.academy/kekstagram';
const SUCCESS_CODE = 200;
const TIMEOUT = 10000;

const load = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
    if (xhr.status === SUCCESS_CODE) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа ${xhr.status}: ${xhr.statusText}`);
    }
  });
  xhr.addEventListener('error', () => {
    onError('Ошибка соединения');
  });
  xhr.addEventListener('timeout', () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT;

  xhr.open('GET', URL_LOAD);
  xhr.send();
};

const save = (data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
    if (xhr.status === SUCCESS_CODE) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа ${xhr.status}: ${xhr.statusText}`);
    }
  });
  xhr.addEventListener('error', () => {
    onError('Ошибка соединения');
  });
  xhr.addEventListener('timeout', () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT;

  xhr.open('POST', URL_SAVE);
  xhr.send();
};

const errorHandler = (errorMessage) => {
  const node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff4d4d;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';
  node.style.padding = '10px';

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
};

export {
  load,
  save,
  errorHandler
};
