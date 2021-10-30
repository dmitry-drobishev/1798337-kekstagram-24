import { createPosts } from './logic/create-posts.js';
import { createMinPictures } from './logic/create-min-pictures.js';
import { initPostsPreviews } from './logic/open-full-picture.js';
import { initUploadForm } from './logic/upload-form.js';

initUploadForm();
const postsArray = createPosts(20);
createMinPictures(postsArray);
initPostsPreviews(postsArray);
