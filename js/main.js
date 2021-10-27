import { createPosts } from './logic/create-posts.js';
import { createMinPictures } from './logic/create-min-pictures.js';
import { openPost } from './logic/open-full-picture.js';

const postsArray = createPosts(20);
createMinPictures(postsArray);
openPost(postsArray);
