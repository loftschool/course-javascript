export default class FriendsList {
  constructor(storage) {
    this.storage = storage;
    this.data = new Map();
  }

  async load() {
    this.data.clear();
    const list = await this.storage.load();

    for (const item of list) {
      this.add(item);
    }
  }

  save() {
    this.storage.save([...this.data.values()]);
  }

  add(friend) {
    if (!this.data.has(friend.id)) {
      this.data.set(friend.id, friend);
    }
  }

  delete(friendId) {
    friendId = Number(friendId);
    const friend = this.data.get(friendId);

    if (friend) {
      this.data.delete(friendId);
    }

    return friend;
  }

  valuesIterable() {
    return this.data.values();
  }
}
