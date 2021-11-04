const imgUploadPopup = document.querySelector('.img-upload'); // попап с загрузкой нового изображения
const handleScaleUp = imgUploadPopup.querySelector('.scale__control--bigger');
const handleScaleDown = imgUploadPopup.querySelector('.scale__control--smaller');
const scaleControlCounter = imgUploadPopup.querySelector('.scale__control--value');
const uploadPicture = imgUploadPopup.querySelector('.img-upload__preview img');
const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;

const scaleUp = () => {
  let scaleNewValue = parseInt(scaleControlCounter.value, 10) + SCALE_STEP;
  if (scaleNewValue > MAX_SCALE) {
    scaleNewValue = MAX_SCALE;
  }
  scaleControlCounter.value = `${scaleNewValue}%`;
  uploadPicture.style.transform = `scale(${scaleNewValue}%)`;
};

const scaleDown = () => {
  let scaleNewValue = parseInt(scaleControlCounter.value, 10) - SCALE_STEP;
  if (scaleNewValue < MIN_SCALE) {
    scaleNewValue = MIN_SCALE;
  }
  scaleControlCounter.value = `${scaleNewValue}%`;
  uploadPicture.style.transform = `scale(${scaleNewValue}%)`;
};

const initUploadPicture = () => {
  handleScaleUp.addEventListener('click', scaleUp);
  handleScaleDown.addEventListener('click', scaleDown);
};

const closeScalePictureEvents = () => {
  uploadPicture.style.transform = 'scale(100%)';
  handleScaleUp.removeEventListener('click', scaleUp);
  handleScaleDown.removeEventListener('click', scaleDown);
};

export { initUploadPicture, closeScalePictureEvents };
