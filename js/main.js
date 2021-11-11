import { createMinPictures } from './logic/create-min-pictures.js';
import { initPostsPreviews } from './logic/open-full-picture.js';
import { initUploadForm } from './logic/upload-form.js';
import { getData } from './logic/api.js';
import { showAlert } from './logic/show-alert.js';

const initContent = (postsArray) => {
  createMinPictures(postsArray);
  initPostsPreviews(postsArray);
};

initUploadForm();
getData(initContent, showAlert);
