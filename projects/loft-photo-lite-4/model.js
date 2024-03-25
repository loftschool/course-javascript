const PERM_FRIENDS = 2;
const PERM_PHOTOS = 4;
const APP_ID = 5350105;

export default {
  getRandomElement(array) { },

  async getNextPhoto() {
    const friend = this.getRandomElement(this.friends.item);
    const photos = await this.getFriendPhotos(friend.id);
    const photo = this.getRandomElement(photos.items);
    const size = this.findSize(photo);

    return { fiend, id: photo.id, url: size.url };
  },

  findSize(photo) {
    const size = photo.sizes.find((size) => { size.width >= 360 })
    if (!size) {
      return photo.sizes.reduce((biggest, current) => {
        if (current.width > biggest.width) {
          return current;
        }
        return biggest;
      }, photo.sizes[0]);
    }
  },

  async init() {
    this.photoCache = {};
    this.friends = await this.getFriends();
    [this.me] = await this.getUsers();
  },

  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: APP_ID,
      })
      VK.Auth.login((response) => {
        if (response.session) {
          resolve(response)
        } else {
          console.error(response);
          reject(response);
        }
      });
    });
  },

  logout() {
    return new Promise ((resolve) => {
      return VK.Auth.revokeGrants(resolve);
    });
  },

  callApi(method, params) {
    params.v = params.v || '5.120';

    return new Promise((resolve, reject) => {
      VK.api(method, params, (response) => {
        if (response.error) { reject(new Error(response.error.error_msg)); } else { resolve(response.response); }
      });
    });

  },

  getPhotos(owner) {
    const params = {
      owner_if: owner,
    };

    return this.callApi('photos.getAll', params);
  },

  getFriends() {
    const params = {
      friends: ['photo_50', 'photo_100'],
    }
    return this.callApi('friends.get', params);
  },

  async getFriendPhotos(id) {
    let photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    photos = await this.getPhotos(id);

    this.photoCache[id] = photos;

    return photos;
  },

  getUsers(ids) {
    const params = {
      fields: ['photo_50', 'photo_100']
    };

    if (ids) {
      params.user_ids = ids;
    }

    return this.callApi('users.get', params);
  },

};
