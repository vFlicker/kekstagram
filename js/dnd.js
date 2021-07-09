"use strict";

(() => {

  const initSlider = (callback) => {
    const cb = callback();

    const effectLevelLine = cb.effectLevelLine;
    const effectLevelPin = cb.effectLevelPin;
    const effectLevelLineDepth = cb.effectLevelLineDepth;

    effectLevelLineDepth.style.width = 20 + '%';
    effectLevelPin.style.left = 20 + '%';

    effectLevelPin.addEventListener('mousedown', (evt) => {
      evt.preventDefault();

      const shift = evt.clientX - effectLevelPin.getBoundingClientRect().left - effectLevelPin.offsetWidth / 2;

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        const maxValue = effectLevelLine.offsetWidth;
        let newValue = moveEvt.clientX - shift - effectLevelLine.getBoundingClientRect().left;

        if (newValue < 0) {
          newValue = 0;
        }
        if (newValue > maxValue) {
          newValue = maxValue;
        }

        const scaleLevel = newValue / maxValue * 100;

        effectLevelLineDepth.style.width = scaleLevel + '%';
        effectLevelPin.style.left = scaleLevel + '%';

        const consty = cb.consty;
        consty(scaleLevel);
      };

      const onMouseUp = (upEvt) => {
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
