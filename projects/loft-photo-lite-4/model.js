const PERM_FRIENDS = 2;
const PERM_PHOTOS = 4;
const APP_ID = 5350105;

export default {
  getRandomElement(array) { },

  async getNextPhoto() { },

  async init() {
    this.photoCache = {};
    this.friends = await this.getFriends();
    [this.me] = await this.getUsers();
  },

  login() { },

  logout() { },

  getFriends() { },

  getUsers(ids) {
    const params = {
      fields: ['photo_50', 'photo_100'],
    };

    if (ids) {
      params.user_ids = ids;
    }

    return this.callApi('users.get', params);
  },

  async getFriendPhotos(id) { },
};
