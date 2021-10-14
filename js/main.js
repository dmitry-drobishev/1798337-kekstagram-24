import { createPosts } from './utils/create-posts.js';
import { createMinPictures } from './utils/create-min-pictures.js';

createMinPictures(createPosts(15));
