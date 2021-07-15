import {openEditor} from './editor.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
      openEditor();
    });

    reader.readAsDataURL(file);
  }
});
