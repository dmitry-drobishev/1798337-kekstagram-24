const picturesData = {
  src: '1',
  likes: '100',
  comments: 'собака сутулая',
};

// const minImagesListFragment = document.createDocumentFragment();
const picture = document.querySelector('#picture').content;
const patternPicture = picture.querySelector('.picture');
// console.log(patternPicture);
const newMinPicture = patternPicture.cloneNode(true);
newMinPicture.querySelector('.picture__img').src = picturesData.src;
newMinPicture.querySelector('.picture__likes').textContent = picturesData.likes;
newMinPicture.querySelector('.picture__comments').textContent = picturesData.comments;
// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.

// <template id="picture">
//     <a href="#" class="picture">
//       <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
//       <p class="picture__info">
//         <span class="picture__comments"></span>
//         <span class="picture__likes"></span>
//       </p>
//     </a>
//   </template>
