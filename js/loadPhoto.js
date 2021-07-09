'use strict';

(function () {

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  const fileChooser = document.querySelector('.img-upload__start input[type=file]');
  const preview = document.querySelector('.img-upload__preview img');

  fileChooser.addEventListener('change', function () {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        window.form.openEditorPicture();
      });

      reader.readAsDataURL(file);
    }
  });

})();
