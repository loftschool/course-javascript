export class LocalStorage {
  constructor(api, key) {
    this.api = api;
    this.key = key;
  }

  async load() {
    const friendsIds = JSON.parse(localStorage.getItem(this.key) || '[]');
    return await this.api.getUsers(friendsIds);
  }

  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data.map((item) => item.id)));
  }
}

export class VKStorage {
  constructor(api) {
    this.api = api;
  }

  async load() {
    const response = await this.api.getFriends();
    return response.items;
  }

  save() {
    throw new Error('not supported');
  }
}
