import './chat.html';
import noPhotoImage from './no-photo.png';

window.onload = () => {
  const socket = new WebSocket('ws://localhost:8088');
  const messageText = document.querySelector('#messageText');
  const messageContainer = document.querySelector('#messageContainer');
  const userTitle = document.querySelector('#name');
  const photo = document.querySelector('#photo');
  const login = document.querySelector('#nameInput');
  const btnLogin = document.querySelector('#loginSubmit');
  const btnSendMsg = document.querySelector('#sendButton');
  const userList = document.querySelector('#userList');
  const input = document.querySelector('#typeFile');

  let users = new Map();
  let currentUserName = null;

  socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'list': {
        users = new Map(data.users.map((user) => [user.name, user]));
        renderUserList();
        break;
      }
      case 'userLeft': {
        if (data.user.name !== currentUserName) {
          addSystemMessage(data.user.name + ' покинул чат');
          users.delete(data.user.name);
          renderUserList();
        }
        break;
      }
      case 'userJoin': {
        users.set(data.user.name, data.user);
        if (data.user.name !== currentUserName) {
          addSystemMessage(data.user.name + ' вошел в чат');
          renderUserList();
        } else {
          renderCurrentUser();
        }
        break;
      }
      case 'updateUser': {
        document.querySelectorAll('.user-avatar').forEach((el) => {
          const username = el.getAttribute('data-username');
          if (username === data.user.name) {
            el.style.backgroundImage = avatarURL(data.user.avatar);
          }
        });
        break;
      }
      case 'msg': {
        const avatar = data.user.avatar
          ? 'http://localhost:8282/photo/' + data.user.avatar
          : '/' + noPhotoImage;
        const messageItem = document.createElement('div');
        messageItem.classList.add('message-item');
        messageItem.innerHTML =
          `<div class="message-item-left">
                    <div data-username="` +
          data.user.name +
          `" 
                    style="background-image: url(` +
          avatar +
          `")" 
                    class="message-item-photo user-avatar"></div>
                </div>
                <div message-item-right>
                    <div class="message-item-header">
                        <div class="message-item-header-name">${data.user.name}</div>
                        <div class="message-item-header-time">${data.time}</div>
                    </div>
                    <div class="message-item-text">${data.text}</div>
                </div>`;
        messageContainer.appendChild(messageItem);
        messageContainer.scrollTop = messageContainer.scrollHeight;
        break;
      }
      default:
        break;
    }
  });

  socket.addEventListener('error', function () {
    alert('Соединение закрыто или не может быть открыто');
  });

  btnLogin.addEventListener('click', () => {
    userLogin(login.value);
  });

  btnSendMsg.addEventListener('click', () => {
    sendEvent('msg', messageText.value);
    messageText.value = '';
  });

  photo.addEventListener('click', () => {
    input.click();
  });

  login.addEventListener('input', function () {
    btnLogin.disabled = this.value ? false : true;
  });

  function sendEvent(type, text = '') {
    const data = {
      type: type,
      text: text,
      user: {
        name: currentUserName,
        avatar: '',
      },
    };
    socket.send(JSON.stringify(data));
  }

  function updateUser(name, photo) {
    const data = {
      type: 'updateUser',
      user: {
        name: name,
        avatar: photo.id,
      },
    };
    socket.send(JSON.stringify(data));
  }

  function userLogin(name) {
    currentUserName = name;
    sendEvent('userJoin');
    document.querySelector('#login').classList.add('hidden');
    document.querySelector('#chat').classList.remove('hidden');
    renderCurrentUser();
  }

  function renderCurrentUser() {
    userTitle.textContent = currentUserName;
    const user = users.get(currentUserName) || {};
    photo.style.backgroundImage = avatarURL(user.avatar);
    photo.setAttribute('data-username', currentUserName);
  }

  function renderUserList() {
    const fragment = document.createDocumentFragment();
    userList.innerHTML = '';
    const list = document.createElement('ul');
    users.forEach((user) => {
      const element = document.createElement('li');
      element.textContent = user.name;
      list.append(element);
    });
    fragment.append(list);
    userList.append(fragment);
  }

  function avatarURL(avatar) {
    return avatar
      ? 'url("http://localhost:8282/photo/' + avatar + '")'
      : 'url("/' + noPhotoImage + '")';
  }

  input.addEventListener('change', function () {
    if (input.files[0]) {
      const data = new FormData();
      data.append('file', input.files[0]);
      fetch('http://localhost:8282/photo', {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          updateUser(currentUserName, result);
        })
        .finally(() => {
          input.value = '';
        });
    }
    return;
  });

  function addSystemMessage(msg) {
    const messageItem = document.createElement('div');
    messageItem.innerHTML = '';
    messageItem.classList.add('message-item-system');
    messageItem.textContent = msg;

    messageContainer.appendChild(messageItem);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
};
