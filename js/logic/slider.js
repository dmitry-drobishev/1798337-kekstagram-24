const imgUploadPopup = document.querySelector('.img-upload'); // попап с загрузкой нового изображения
const effectLevel = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const uploadPicture = imgUploadPopup.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
let currentEffect = 'none';
const SLIDER_OPTIONS = {
  chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  marvin: { range: { min: 0, max: 100 }, start: 100, step: 1 },
  phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
  heat: { range: { min: 1, max: 3 }, start: 3, step: 0.1 },
  none: {},
};

const getEffect = () => {
  const SLIDER_STYLE_FILTERS = {
    chrome: `grayscale(${effectLevel.value})`,
    sepia: `sepia(${effectLevel.value})`,
    marvin: `invert(${effectLevel.value}%)`,
    phobos: `blur(${effectLevel.value}px)`,
    heat: `brightness(${effectLevel.value})`,
    none: 'none',
  };
  return SLIDER_STYLE_FILTERS;
};

const handleEffectClick = (evt) => {
  uploadPicture.className = '';
  const eventOnRadioButton = evt.target.closest('.effects__radio');
  if (eventOnRadioButton) {
    currentEffect = eventOnRadioButton.value;
    uploadPicture.classList.add(`effects__preview--${currentEffect}`);
  }
};

const handleEffectChange = (evt) => {
  if (!evt.target.checked) { return; }
  slider.noUiSlider.updateOptions(SLIDER_OPTIONS[currentEffect]);
  slider.noUiSlider.on('update', (values, handle) => {
    effectLevel.value = values[handle];
    const SLIDER_STYLE_FILTERS = getEffect();
    document.querySelector(`.effects__preview--${currentEffect}`).style.filter = SLIDER_STYLE_FILTERS[currentEffect];
    if (currentEffect === 'none') {
      slider.style.display = 'none';
    } else {
      slider.style.display = 'block';
    }
  });
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
  slider.style.display = 'none';
  effectsList.addEventListener('click', handleEffectClick);
  effectsList.addEventListener('change', handleEffectChange);
};

const closeSliderEvents = () => {
  slider.noUiSlider.destroy();
  uploadPicture.className = '';
  uploadPicture.style = '';
  effectsList.removeEventListener('click', handleEffectClick);
  effectsList.removeEventListener('change', handleEffectChange);
};

export { initSlider, closeSliderEvents };
