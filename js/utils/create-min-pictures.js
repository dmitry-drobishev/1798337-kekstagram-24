import {createPosts} from './create-posts.js';
const picture = document.querySelector('#picture').content;
const patternPicture = picture.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createMinPictures = (postsArray) => {
  const minImagesListFragment = document.createDocumentFragment();

  postsArray.forEach((postData) => {
    const newMinPicture = patternPicture.cloneNode(true);
    newMinPicture.querySelector('.picture__img').src = postData.url;
    newMinPicture.querySelector('.picture__likes').textContent = postData.like;
    newMinPicture.querySelector('.picture__comments').textContent = postData.comments.length;
    minImagesListFragment.appendChild(newMinPicture);
  });
  picturesContainer.appendChild(minImagesListFragment);
};

createMinPictures(createPosts(0));

export {createMinPictures};
