import { createMinPictures } from './logic/create-min-pictures.js';
import { initPostsPreviews } from './logic/open-full-picture.js';
import { initUploadForm } from './logic/upload-form.js';
import { getData } from './logic/api.js';
import { showAlert } from './logic/show-alert.js';
import { showFilters, sortMinPictures } from './logic/sort-pictures.js';

const initContent = (posts) => {
  createMinPictures(posts);
  initPostsPreviews(posts);
  showFilters();
  sortMinPictures(posts);
};

initUploadForm();

getData(initContent, showAlert);
