const PERM_FRIENDS = 2;
const PERM_PHOTOS = 4;
const APP_ID = 5350105;

export default {

  callAPI(method, params) {
    params.v = '5.131';
  
    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    })
  },

  getRandomElement(array) {
    if(!Array.isArray(array) || array.length === 0) {
      throw new Error ('empty array');
    }
    const ix = parseInt(Math.random() * (array.length - 1));
    return array[ix];
  },

  findPhotoSize(photo) {
    const size = photo.sizes.find((size) => size.width >= 360);
    if (!size) {
      return photo.sizes.reduce((biggest, current) =>{
        if (current.width > biggest.width) {
          return current;
        }

        return biggest;
      },
      photo.sizes[0]);
    }
    return size;
  },

  async getNextPhoto(array, ) {
    const friend = this.getRandomElement(this.friends.items);
    const photos = await this.getFriendPhotos(friend.id);
    console.log(photos)
    const photo = this.getRandomElement(photos.items);
    const size = this.findPhotoSize(photo);
    return {
      friend,
      id: photo.id,
      url: size.url
    };
  },

  async init() {
    this.photoCache = {};
    this.friends = await this.getFriends();
    [this.me] = await this.getUsers();
  },

  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: APP_ID
      });
      
      VK.Auth.login((response) => {
          if (response.session) {
            this.token = response.session.sid;
            resolve(response);
          } else {
            console.error(response);
            reject(response);
          }
        }, PERM_FRIENDS | PERM_PHOTOS
      );
    });
  },

  logout() {
    return new Promise((resolve) => VK.Auth.revokeGrants(resolve));
  },

  getFriends() {
    const params = {
      fields: ['photo_100', 'photo_50'],
    };
    return this.callAPI('friends.get', params);
  },

  getPhotos(user) {
    const params = {
      owner_id: user,
    };
    return this.callAPI('photos.getAll', params);
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
      fields: [`photo_50`, `photo_100`],
    };

    if (ids) {
      params.user_ids = ids;
    }

    return this.callAPI('users.get', params);
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

      const response = await fetch(`/loft-photo-lite-5/api/&${query}`, params);

      return response.json();
  },

  async like(photo) {
    return this.callServer('like', { photo });
  },

  async photoStats(photo) {
    return this.callServer('photoStats', { photo });
  },

  async getComments(photo) {
    return this.callServer('getComments', { photo });
  },

  async postComment(photo, text) {
    return this.callServer('postCommest', { photo }, { text });
  },
};
