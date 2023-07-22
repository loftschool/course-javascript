import photosDB from './photos.json';
import friendsDB from './friends.json';

export default {
    getRandomElement(array) {
        if (!array.length) {
            return null;
        }

        const index = Math.round(Math.random() * (array.length - 1));

        return array[index];
    },

    getNextPhtoto() {
        const friend = this.getRandomElement(friendsDB);
        const photos = photosDB[friend.id];
        const photo = this.getRandomElement(photos);

        return { friend, url: photo.url}
    },
};