const PERM_FRIENDS = 2;
const PERM_PHOTOS = 4;
const APP_ID = 51694434;

export default {
  getRandomElement(array) {
    if (!array.length) {
      return null;
    }
    const index = Math.round(Math.random() * (array.length - 1));
    return array(index);
  },
  async getNextPhoto() {
    //рандомно получаем друга
    const friend = this.getRandomElement(this.friends.items);
    //берем список всех фотографий полученного друга
    const photos = await this.getFriendPhotos(friend.id);
    const photo = this.getRandimElement(photos.items);
    const size = this.findSize(photo);

    return { friend, id: photo.id, url: size.url };
  },
  findSize(photo) {
    //находим элемент с шириной не менее 360
    const size = photo.sizes.find((size) => size.width >= 360);
    //если не нашли такую, то ищем любую самую большую из имеющихся
    if (!size) {
      return photo.sizes.reduce((biggest, current) => {
        if (current.width > biggest.width) {
          return current;
        }

        return biggest;
      }, photo.sizes[0]);
    }
    return size;
  },
  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: APP_ID,
      });

      VK.Auth.login((response) => {
        if (response.session) {
          //получаем vk_token 
          this.token = response.session.sid;
          resolve(response);
        } else {
          console.error(response);
          reject(response);
        }
      }, PERM_FRIENDS | PERM_PHOTOS);
    });
  },
  async init() {
    this.photoCache = {};
    //сохраняем список в свойство friends
    this.friends = await this.getFriends();
    //сохраняем информацию о текущем пользователе в свойство me
    [this.me] = await this.getUsers();
  },
  photoCache: {},
  callApi(method, params) {
    params.v = params.v || '5,120';
    return new Promise((resolve, reject) => {
      VK.api(method, params, (response) => {
        if (response.error) {
          reject(new Error(response.error.error_msg));
        } else {
          resolve(response.response);
        }
      });
    });
  },
  getFriends() {
    const params = {
      //размеры для фотографий
      fields: ['photo_50', 'photo_100'],
    };
    return this.callApi('friends.get', params);
  },
  getPhotos(owner) {
    const params = {
      owner_id: owner,
    };
    return this.callApi('photos.getAll', params);
  },
  async getFriendPhotos(id) {
    const photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    // const photos = вместо этого комментария вставьте код для получения фотографии друга из ВК
    photos = await this.getPhotos(id);

    this.photoCache[id] = photos;

    return photos;
  },
  logout() {
    return new Promise((resolve) => VK.Auth.revokeGrants(resolve));
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
    //если указано тело, то отправляем post запрос
    if (body) {
      params.method = 'POST';
      params.body = JSON.stringify(body)
    }

    const response = await fetch(`/loft-photo-lite-5/api/?${query}`, params);

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

  async postComments(photo, text) {
    return this.callServer('postComment', { photo }, { text });
  },
};
