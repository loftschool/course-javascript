// eslint-disable-next-line no-unused-vars
import photosDB from './photos.json';
// eslint-disable-next-line no-unused-vars
import friendsDB from './friends.json';

export default {
  getRandomElement(array) {
    if(!Array.isArray(array) || array.length === 0) {
      throw new Error ('empty array');
    }

    const ix = parseInt(Math.random() * (array.length - 1));

    return array[ix];

    // if(!array.length) {
    //   return null;
    // }

  },



  getNextPhoto(array, ) {

    const friend = this.getRandomElement(friendsDB);

    const photos = photosDB[friend, id];

    const photo = this.getRandomElement(photos);

    return {
      friend,
      url: photo.url
    };
  },
};
