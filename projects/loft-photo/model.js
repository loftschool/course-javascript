// eslint-disable-next-line no-unused-vars
import photosDB from './photos.json';
// eslint-disable-next-line no-unused-vars
import friendsDB from './friends.json';

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
          this.token = response.session.sid;
          resolve(response)
        } else {
          console.error(response);
          reject(response);
        }
      });
    });
  },

  logout() {
    return new Promise((resolve) => {
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

async callServer(method, queryParams, body) {
  queryParams = {
    ...queryParams,
    method,
  };

  const query = Object.entries(queryParams)
  .reduce((all, [name, value]) => {
    all.push(`${name}=${encodeURIComponent(value)}`);
    return all;
  }, [])
  .join('&');
  const params = {
    headers: {
      vk_token: this.token,
    },
  };

  if (body) {
    params.method = 'POST';
    params.body = JSON.stringify(body);
  }

  // const response = await fetch (``) 
},

  async like(photo) {
   return this.callServer('like', {photo});
  },
  async photoStats(photo) {
    return this.callServer('photoStats', {photo});
  },
  async postComment(photo, text) {
    return this.callServer('postComments', {photo}, {text})
  },
  async getComments(photo) {
    return this.callServer('getComments', {photo});
  },

};
