import {SuccessHTTPSStatusRange} from './const.js';

const END_POINT = 'https://23.javascript.pages.academy/kekstagram';

const checkStatus = (response) => {
  if (
    response.status < SuccessHTTPSStatusRange.MIN ||
    response.status > SuccessHTTPSStatusRange.MAX
  ) {
    throw new Error(`Статус ответа ${response.status}: ${response.statusText}`);
  }

  return response;
};

const catchError = (err) => {
  throw err;
};

const toJSON = (response) => response.json();

const getPosts = () => fetch(`${END_POINT}/data`)
  .then(checkStatus)
  .catch(catchError)
  .then(toJSON);

const addPost = (post, successHandler, errorHandler) => fetch(END_POINT, {method: 'POST', body: post})
  .then(checkStatus)
  .catch(errorHandler)
  .then(toJSON)
  .then(successHandler);

export {
  getPosts,
  addPost
};
