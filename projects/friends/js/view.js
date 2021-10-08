const Model = require('./model');
module.exports = {
  render(users) {
    this.renderUsersLists(
      Model.getNotSavedFriends(users),
      document.querySelector('#left'),
      'app__arrow',
      false
    );
    this.renderUsersLists(
      Model.loadSavedItems(),
      document.querySelector('#right'),
      'app__arrow--close',
      true
    );
  },
  renderUsersLists(users, where, className, fav) {
    const userList = where.querySelector('.app__list');
    userList.innerHTML = '';
    users.forEach((user, key) => {
      if (user.first_name) {
        userList.innerHTML += `
        <li class="app__item" draggable="true" data-id='${key}' data-fav='${fav}'>
          <img src=${user.photo_50} class="app__photo">
          <div class="app__friend">${user.first_name} ${user.last_name}</div>
          <div class=${className}></div>
        </li>
      `;
      }
    });
  },
  filter(searchString, where) {
    const LIs = where.querySelectorAll('li');
    if (searchString) {
      LIs.forEach((li) => hide(li));
      LIs.forEach((li) => {
        const name = li.querySelector('.app__friend').textContent;
        if (isMatching(name, searchString)) {
          showFlex(li);
        }
      });
    } else {
      LIs.forEach((li) => showFlex(li));
    }
    function isMatching(full, chunk) {
      if (!chunk) return false;
      return full.toLowerCase().includes(chunk.toLowerCase());
    }
    function hide(element) {
      element.style.display = 'none';
    }
    function showFlex(element) {
      element.style.display = 'flex';
    }
  },
};
