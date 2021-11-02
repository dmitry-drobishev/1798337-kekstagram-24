const imgUploadPopup = document.querySelector('.img-upload'); // попап с загрузкой нового изображения
const valueSliderElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const uploadPicture = imgUploadPopup.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
let effectClassMod = 'none';

const slider = () => {
  uploadPicture.className = '';
  effectsList.addEventListener('click', (evt) => {
    uploadPicture.className = '';
    if (evt.target.closest('.effects__radio')) {
      uploadPicture.className = '';
      uploadPicture.classList.add(`effects__preview--${evt.target.closest('.effects__radio').value}`);
      // const classEffect = effectsList.querySelector('span[class*="effects__preview--"]').className('span[class*="effects__preview--"]');
    }
  });

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  effectsList.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      const effectName = evt.target.closest('.effects__radio').value;
      if (effectName === 'chrome') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        effectClassMod = 'chrome';
        document.querySelector('.effects__preview--chrome').style.filter = `grayscale(${valueSliderElement.value})`;
      } else if (effectName === 'sepia') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        effectClassMod = 'sepia';
        document.querySelector('.effects__preview--sepia').style.filter = `sepia(${valueSliderElement.value})`;
      } else if (effectName === 'marvin') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        });
        effectClassMod = 'marvin';
        document.querySelector('.effects__preview--marvin').style.filter = `invert(${valueSliderElement.value}%)`;
      } else if (effectName === 'phobos') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        effectClassMod = 'phobos';
        document.querySelector('.effects__preview--phobos').style.filter = `blur(${valueSliderElement.value}px)`;
      } else if (effectName === 'heat') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        effectClassMod = 'heat';
        document.querySelector('.effects__preview--heat').style.filter = `brightness(${valueSliderElement.value})`;
      }
    }
  });

  sliderElement.noUiSlider.on('update', (values, handle) => {
    valueSliderElement.value = values[handle];
    if (effectClassMod === 'chrome') {
      document.querySelector('.effects__preview--chrome').style.filter  = `grayscale(${valueSliderElement.value})`;
    } else if (effectClassMod === 'sepia') {
      document.querySelector('.effects__preview--sepia').style.filter = `sepia(${valueSliderElement.value})`;
    } else if (effectClassMod === 'marvin') {
      document.querySelector('.effects__preview--marvin').style.filter = `invert(${valueSliderElement.value}%)`;
    } else if (effectClassMod === 'phobos') {
      document.querySelector('.effects__preview--phobos').style.filter = `blur(${valueSliderElement.value}px)`;
    } else if (effectClassMod ==='heat') {
      document.querySelector('.effects__preview--heat').style.filter = `brightness(${valueSliderElement.value})`;
    }
  });
};

// else if (evt.target.closest('.effects__radio').value === 'none') {
//   sliderElement.noUiSlider.destroy();
// }

export { slider };
