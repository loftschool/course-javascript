export function showMainWindow() {
  const auth = document.querySelector('.auth');
  auth.style.display = 'none';
  const chat = document.querySelector('.chat');
  chat.style.display = 'grid';
  const messages = chat.querySelector('.messages');
  messages.innerHTML = '';
}

export function showAuthWindow() {
  const auth = document.querySelector('.auth');
  auth.style.display = 'flex';
  const chat = document.querySelector('.chat');
  chat.style.display = 'none';
}

export function renderUserList(users) {
  const usersList = document.querySelector('.users__list');
  usersList.innerHTML = '';
  for (const nickname of Object.keys(users)) {
    const imgSrc = users[nickname] || './chat/img/photo.svg';
    const objectFit = imgSrc === './chat/img/photo.svg' ? 'none' : 'contain';
    usersList.innerHTML += `
      <li class="users__item user">
        <div class="user__img">
          <img src=${imgSrc} width="46" height="46" data-nickname="${nickname}" style="object-fit: ${objectFit}">
        </div>
        <div class="user__info">
          <div class="user__nick">${nickname}</div>
          <div class="user__status"></div>
        </div>
      </li>`;
  }
  const userCounter = document.querySelector('.chat__count');
  userCounter.textContent = `${Object.keys(users).length} ${getUserCounterPostfix(
    Object.keys(users).length
  )}`;
}

function getUserCounterPostfix(length) {
  const n = length % 10;
  if (n > 10 && n < 20) {
    return 'участников';
  }
  if (n > 1 && n < 5) {
    return 'участника';
  }
  if (n === 1) {
    return 'участник';
  }
  return 'участников';
}

export function setUserData(user, img) {
  const modalNickname = document.querySelector('.modal__nickname');
  modalNickname.textContent = user;
  const modalImage = document.querySelector('.modal img');
  modalImage.dataset.nickname = user;
  modalImage.src = img || './chat/img/photo.svg';
  modalImage.style.objectFit = img === './chat/img/photo.svg' ? 'none' : 'contains';
  const userList = document.querySelector('.users__list');
  userList.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.dataset.nickname === user) {
      const modal = document.querySelector('.modal');
      modal.classList.remove('modal--hide');
    }
  });
}
