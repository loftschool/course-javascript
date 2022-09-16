import VKAPI from './vkAPI';
import FriendsList from './friendsList';
import { VKStorage } from './storage';

export default class FriendsFilter {
  constructor() {
    this.allFriendsDOMList = document.querySelector(
      '[data-role=list-items][data-list=all]'
    );

    this.api = new VKAPI(6789124, 2);
    this.allFriends = new FriendsList(new VKStorage(this.api));

    this.init();
  }

  async init() {
    await this.api.init();
    await this.api.login();
    await this.allFriends.load();

    this.reloadList(this.allFriendsDOMList, this.allFriends);
  }

  reloadList(listDOM, friendsList) {
    const fragment = document.createDocumentFragment();

    listDOM.innerHTML = '';

    for (const friend of friendsList.valuesIterable()) {
      const friendDOM = this.createFriendDOM(friend);
      fragment.append(friendDOM);
    }

    listDOM.append(fragment);
  }

  createFriendDOM(data) {
    const root = document.createElement('div');

    root.dataset.role = 'list-item';
    root.dataset.friendId = data.id;
    root.classList.add('list-item');
    root.innerHTML = `
    <img class="list-item-photo" src="${data.photo_50}"/>
    <div class="list-item-name">${data.first_name} ${data.last_name}</div>
    <div class="list-item-swap" data-role="list-item-swap" data-friend-id="${data.id}"></div>
    `;

    return root;
  }
}
