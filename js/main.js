import { createPosts } from './utils/create-posts.js';
import { createMinPictures } from './utils/create-min-pictures.js';
import { openPost } from './utils/open-full-picture.js';

const postsArray = createPosts(15);
createMinPictures(postsArray);
openPost(postsArray);
