import VKAPI from './vkAPI';
import FriendsList from './friendsList';
import { LocalStorage, VKStorage } from './storage';

export default class FriendsFilter {
  constructor() {
    this.lsKey = 'LS_FRIENDS_FILTER';
    this.allFriendsDOMFilter = document.querySelector(
      '[data-role=filter-input][data-list=all]'
    );
    this.allFriendsDOMList = document.querySelector(
      '[data-role=list-items][data-list=all]'
    );
    this.bestFriendsDOMFilter = document.querySelector(
      '[data-role=filter-input][data-list=best]'
    );
    this.bestFriendsDOMList = document.querySelector(
      '[data-role=list-items][data-list=best]'
    );

    this.api = new VKAPI(51428452, 2);
    this.allFriends = new FriendsList(new VKStorage(this.api));
    this.bestFriends = new FriendsList(new LocalStorage(this.api, this.lsKey));

    this.init();
  }

  async init() {
    await this.api.init();
    await this.api.login();
    await this.allFriends.load();
    await this.bestFriends.load();

    for (const item of this.bestFriends.valuesIterable()) {
      await this.allFriends.delete(item.id);
    }

    this.reloadList(this.allFriendsDOMList, this.allFriends);
    this.reloadList(this.bestFriendsDOMList, this.bestFriends);

    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('click', this.onClick.bind(this));

    this.allFriendsDOMFilter.addEventListener('input', (e) => {
      this.allFriendsFilter = e.target.value;
      this.reloadList(this.allFriendsDOMList, this.allFriends, this.allFriendsFilter);
    });
    this.bestFriendsDOMFilter.addEventListener('input', (e) => {
      this.bestFriendsFilter = e.target.value;
      this.reloadList(this.bestFriendsDOMList, this.bestFriends, this.bestFriendsFilter);
    });
  }

  isMatchingFilter(source, filter) {
    return source.toLowerCase().includes(filter.toLowerCase());
  }

  reloadList(listDOM, friendsList, filter) {
    const fragment = document.createDocumentFragment();

    listDOM.innerHTML = '';

    for (const friend of friendsList.valuesIterable()) {
      const fullName = `${friend.first_name} ${friend.last_name}`;

      if (!filter || this.isMatchingFilter(fullName, filter)) {
        const friendDOM = this.createFriendDOM(friend);
        fragment.append(friendDOM);
      }
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

  move(friendId, from, to) {
    if (from === 'all' && to === 'best') {
      const friend = this.allFriends.delete(friendId);
      this.bestFriends.add(friend);
    } else if (from === 'best' && to === 'all') {
      const friend = this.bestFriends.delete(friendId);
      this.allFriends.add(friend);
    }

    this.bestFriends.save();
    this.reloadList(this.allFriendsDOMList, this.allFriends, this.allFriendsFilter);
    this.reloadList(this.bestFriendsDOMList, this.bestFriends, this.bestFriendsFilter);
  }

  onMouseDown(e) {
    const sourceItem = e.target.closest('[data-role=list-item]');

    if (!sourceItem) {
      return;
    }

    const friendId = sourceItem.dataset.friendId;
    const sourceList = e.target.closest('[data-role=list-items]').dataset.list;

    this.dragging = {
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      sourceItem,
      friendId,
      sourceList,
      pending: true,
    };
  }

  onMouseMove(e) {
    if (!this.dragging) {
      return;
    }

    e.preventDefault();

    if (this.dragging.pending) {
      const rect = this.dragging.sourceItem.getBoundingClientRect();
      const clone = this.dragging.sourceItem.cloneNode(true);
      clone.classList.add('list-item-clone');
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      document.body.append(clone);
      this.dragging.pending = false;
      this.dragging.clone = clone;
    }

    this.dragging.clone.style.left = `${e.clientX - this.dragging.offsetX}px`;
    this.dragging.clone.style.top = `${e.clientY - this.dragging.offsetY}px`;
  }

  onMouseUp(e) {
    if (!this.dragging || this.dragging.pending) {
      this.dragging = null;
      return;
    }

    const targetList = e.target.closest('[data-role=list-items]');

    if (targetList) {
      const moveTo = targetList.dataset.list;
      this.move(this.dragging.friendId, this.dragging.sourceList, moveTo);
    }

    this.dragging.clone.remove();
    this.dragging = null;
  }

  onClick(e) {
    if (e.target.dataset.role === 'list-item-swap') {
      const sourceList = e.target.closest('[data-role=list-items]').dataset.list;
      const friendId = e.target.dataset.friendId;

      this.move(friendId, sourceList, sourceList === 'all' ? 'best' : 'all');
    }
  }
}
