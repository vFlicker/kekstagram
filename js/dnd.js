"use strict";

(function () {

    var initSlider = function (callback) {
        var cb = callback();

        var effectLevelLine = cb.effectLevelLine;
        var effectLevelPin = cb.effectLevelPin;
        var effectLevelLineDepth = cb.effectLevelLineDepth;

        effectLevelLineDepth.style.width = 20 + '%';
        effectLevelPin.style.left = 20 + '%';

        effectLevelPin.addEventListener('mousedown', function (evt) {
            evt.preventDefault();

            var shift = evt.clientX - effectLevelPin.getBoundingClientRect().left - effectLevelPin.offsetWidth / 2;

            var onMouseMove = function (moveEvt) {
                moveEvt.preventDefault();

                var maxValue = effectLevelLine.offsetWidth;
                var newValue = moveEvt.clientX - shift - effectLevelLine.getBoundingClientRect().left;

                if (newValue < 0) {
                    newValue = 0;
                }
                if (newValue > maxValue) {
                    newValue = maxValue;
                }

                var scaleLevel = newValue / maxValue * 100;

                effectLevelLineDepth.style.width = scaleLevel + '%';
                effectLevelPin.style.left = scaleLevel + '%';

                var vary = cb.vary;
                vary(scaleLevel);
            };

            var onMouseUp = function (upEvt) {
                upEvt.preventDefault();

                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    window.dnd = {
        initSlider: initSlider
    }

})();