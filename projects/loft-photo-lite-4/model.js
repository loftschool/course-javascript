const API_ID = 51590085;
const FRIENDS_PERMISSION = 2;
const PHOTO_PERMISSION = 4;

export default {
  getRandomElement(array) {
    if (!array.length) {
      return null;
    }

    const index = Math.round(Math.random() * (array.length - 1));

    return array[index];
  },

  async getNextPhoto() {
    const friend = this.getRandomElement(this.friends.items);
    const photos = await this.getFriendPhotos(friend.id);
    const photo = this.getRandomElement(photos.items);
    const size = this.findSize(photo);

    return { friend, id: photo.id, url: size.url };
  },

  findSize(photo) {
    console.log(photo);
    const size = photo.sizes.find((size) => size.width >= 360);

    if (!size) {
      return photo.sizes.reduce((biggest, current) => {
        if (current.width > biggest.width) {
          return current;
        }
        return biggest;
      }), photo.sizes[0]
    }
    return size;
  },

  usersCache: null,
  async init() {
    this.photoCache = {};
    this.friends = await this.getFriends();
    [this.me] = await this.getUsers();
  },

  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: API_ID
      })

      VK.Auth.login((data) => {
        if (data.session) {
          resolve()
        } else {
          reject(new Error("Не удалось авторизоваться"))
        }
      }, FRIENDS_PERMISSION | PHOTO_PERMISSION)
    })
  },

  logout() {
    return new Promise((resolve) => VK.Auth.revokeGrants(resolve));
  },

  getFriends() {
    const params = {
      fields: ['photo_50', 'photo_100', 'photo_400'],
    }
    return this.callApi('friends.get', params);
  },

  getPhotos(owner) {
    const params = {
      owner_id: owner,
    };
    return this.callApi("photos.getAll", params);
  },

  getUsers(ids) {
    const params = {
      fields: ['photo_50', 'photo_100'],
    };

    if (ids) {
      params.user_ids = ids;
    }

    return this.callApi('users.get', params);
  },


  photoCache: {},
  async getFriendPhotos(id) {
    let photos = this.photoCache[id];

    if (photos) {
      return photos;
    }
    photos = await this.getPhotos(id);

    this.photoCache[id] = photos;

    return photos;
  },

  callApi(method, params) {
    params.v = params.v || '5.81';

    return new Promise((resolve, reject) => {
      VK.api(method, params, (response) => {
        if (response.error) {
          console.log(response.error);
          reject(new Error(response.error.error_msg));
        } else {
          resolve(response.response);
        }
      }, 4)
    })
  },
};
