import { createMinPictures } from './logic/create-min-pictures.js';
import { initPostsPreviews } from './logic/open-full-picture.js';
import { initUploadForm } from './logic/upload-form.js';
import { getData } from './logic/api.js';
import { showAlert } from './utils/helper.js';

initUploadForm();
getData(createMinPictures, initPostsPreviews, showAlert);
