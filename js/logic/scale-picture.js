const imgUploadPopup = document.querySelector('.img-upload'); // попап с загрузкой нового изображения
const scaleUpButton = imgUploadPopup.querySelector('.scale__control--bigger');
const scaleDownButton = imgUploadPopup.querySelector('.scale__control--smaller');
const scaleControlCounter = imgUploadPopup.querySelector('.scale__control--value');
const uploadPicture = imgUploadPopup.querySelector('.img-upload__preview img');
const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;

const scaleUploadPicture = () => {
  scaleUpButton.addEventListener('click', () => {

    let scaleNewValue = parseInt(scaleControlCounter.value, 10) + SCALE_STEP;
    if (scaleNewValue > MAX_SCALE) {
      scaleNewValue = MAX_SCALE;
    }
    scaleControlCounter.value = `${scaleNewValue}%`;
    uploadPicture.style.transform = `scale(${scaleNewValue}%)`;
  });

  scaleDownButton.addEventListener('click', () => {

    let scaleNewValue = parseInt(scaleControlCounter.value, 10) - SCALE_STEP;
    if (scaleNewValue < MIN_SCALE) {
      scaleNewValue = MIN_SCALE;
    }
    scaleControlCounter.value = `${scaleNewValue}%`;
    uploadPicture.style.transform = `scale(${scaleNewValue}%)`;
  });
};

export { scaleUploadPicture};
