const SLIDER_OPTIONS = {
  chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  marvin: { range: { min: 0, max: 100 }, start: 100, step: 1 },
  phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
  heat: { range: { min: 1, max: 3 }, start: 3, step: 0.1 },
  none: {},
};

const imgUploadPopup = document.querySelector('.img-upload'); // попап с загрузкой нового изображения
const effectLevel = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const uploadPicture = imgUploadPopup.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
let currentEffect = 'none';

const getEffect = (effect, effectLevelValue) => {
  const sliderStyleFilters = {
    chrome: `grayscale(${effectLevelValue})`,
    sepia: `sepia(${effectLevelValue})`,
    marvin: `invert(${effectLevelValue}%)`,
    phobos: `blur(${effectLevelValue}px)`,
    heat: `brightness(${effectLevelValue})`,
    none: 'none',
  };
  return sliderStyleFilters[effect];
};

const effectChangeHandler = (evt) => {
  if (!evt.target.checked) { return; }
  uploadPicture.className = '';
  currentEffect = evt.target.value;
  uploadPicture.classList.add(`effects__preview--${currentEffect}`);
  slider.noUiSlider.updateOptions(SLIDER_OPTIONS[currentEffect]);
};

const initSlider = () => {
  noUiSlider.create(slider, {
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

  slider.noUiSlider.on('update', (values, handle) => {
    effectLevel.value = values[handle];
    document.querySelector(`.effects__preview--${currentEffect}`).style.filter = getEffect(currentEffect, effectLevel.value);
    if (currentEffect === 'none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
  });

  slider.classList.add('hidden');
  effectsList.addEventListener('change', effectChangeHandler);
};

const handleRemoveSlider = () => {
  slider.noUiSlider.destroy();
  uploadPicture.className = '';
  uploadPicture.style = '';
  effectsList.removeEventListener('change', effectChangeHandler);
};

export { initSlider, handleRemoveSlider };
