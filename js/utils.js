'use strict';

(function () {

    var ESC_KEYCODE = 27;
    
    var shuffle = function (array, length) {
        var copyArray = array.slice();

        if (copyArray.length < length) {
            length = copyArray.length;
        }
        
        var currentIndex = copyArray.length, 
            temporaryValue, 
            randomIndex;

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
    }

    window.utils = {
        ESC_KEYCODE: ESC_KEYCODE,
        getRandomElement: shuffle
    }

})();