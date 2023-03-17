export default {
  getRandomElement(array) {},

  async getNextPhoto() {},

  login() {},

  init() {},

  photoCache: {},
  getFriendPhotos(id) {
    const photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    // const photos = вместо этого комментария вставьте код для получения фотографии друга из ВК

    this.photoCache[id] = photos;

    return photos;
  },
};
