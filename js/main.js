import { createPosts } from './utils/create-posts.js';
import { createMinPictures } from './utils/create-min-pictures.js';
import { initUploadForm } from './utils/upload-form.js';

createMinPictures(createPosts(15));
initUploadForm ();
