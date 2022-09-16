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
