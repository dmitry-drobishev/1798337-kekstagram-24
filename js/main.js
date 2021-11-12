import { createMinPictures } from './logic/create-min-pictures.js';
import { initPostsPreviews } from './logic/open-full-picture.js';
import { initUploadForm } from './logic/upload-form.js';
import { getData } from './logic/api.js';
import { showAlert } from './logic/show-alert.js';
import { showFilters, sortMinPictures } from './logic/sort-pictures.js';
import { setPostsArray } from './logic/sort-pictures.js';
// import { shuffleArray } from './logic/sort-pictures.js';
// import { getRandomArray } from './logic/sort-pictures.js';

const initContent = (postsArray) => {
  createMinPictures(postsArray);
  initPostsPreviews(postsArray);
  showFilters();
  setPostsArray(postsArray);
  // createMinPictures(getRandomArray(postsArray));
};

initUploadForm();
getData(initContent, showAlert);

sortMinPictures();
