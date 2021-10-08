module.exports = {
  login(appId, perms) {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: appId,
      });
      VK.Auth.login((response) => {
        if (response.session) {
          resolve(response);
        } else {
          reject(new Error('Не удалось авторизоваться'));
        }
      }, perms);
    });
  },
  callApi(method, params) {
    params.v = params.v || '5.131';

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
  getFriends(params = {}) {
    return this.callApi('friends.get', params);
  },
  getAllFavoriteFriends() {
    const friends = new Map();
    const LIs = document.querySelectorAll('#right .app__list li');
    LIs.forEach((li) => {
      const id = li.dataset.id;
      const first_name = li.querySelector('.app__friend').textContent.split(' ')[0];
      const last_name = li.querySelector('.app__friend').textContent.split(' ')[1];
      const photo_50 = li.querySelector('img').src;
      friends.set(id, { first_name, last_name, photo_50 });
    });
    return friends;
  },
  getNotSavedFriends(allFriends) {
    const savedFriends = this.loadSavedItems();
    if (savedFriends.size > 0) {
      const result = new Map();
      const allFriendsIds = Array.from(allFriends.keys());
      const savedFriendsIds = Array.from(savedFriends.keys());
      const notSavedIds = allFriendsIds.filter((id) => !savedFriendsIds.includes(id));
      notSavedIds.forEach((id) => {
        result.set(id, allFriends.get(id));
      });
      return result;
    } else {
      return allFriends;
    }
  },
  loadSavedItems() {
    const friends = new Map();
    for (const key in localStorage) {
      if (!isNaN(+key) && typeof +key === 'number') {
        friends.set(key, JSON.parse(localStorage.getItem(key)));
      }
    }
    return friends;
  },
  saveItems() {
    localStorage.clear();
    const friends = this.getAllFavoriteFriends();
    friends.forEach((value, key) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  },
};
