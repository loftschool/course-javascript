// eslint-disable-next-line no-unused-vars
import photosDB from './photos.json';
// eslint-disable-next-line no-unused-vars
import friendsDB from './friends.json';

export default {
  getRandomElement(array) {
    const index = parseInt(Math.random() * (array.length - 1));
    return array[index];
  },
  getNextPhoto() {
    const friend = this.getRandomElement(friendsDB);
    const photos = photosDB[friends.id];
    const photo = this.getRandomElement(photos);

    return { friend, url: photo.url };
  },
};
