const ws = require('ws');
const { v4: uuidv1 } = require('uuid');
const server = new ws.Server({
  port: 8081,
});
const users = new Map(); // nickname: {id, img, status}

function getImageByNickname(nickname) {
  return users.get(nickname).img || './chat/img/photo.svg';
}

function getOnlineNicknamesAndPictures() {
  const result = {};
  for (const [key, value] of users) {
    if (value.status === true) {
      result[key] = value.img;
    }
  }
  return result;
}

function getUserByID(id) {
  for (const [key, value] of users) {
    if (value.id === id) {
      return key;
    }
  }
}

function setNicknameImg(nickname, image) {
  const tempUser = users.get(nickname);
  users.set(nickname, {
    id: tempUser.id,
    img: image,
    status: tempUser.status,
  });
}

server.on('connection', onConnect);

function onConnect(client) {
  const id = uuidv1();
  client.on('message', function (message) {
    try {
      const request = JSON.parse(message);
      switch (request.action) {
        case 'LOGIN':
          if (users.has(request.data)) {
            users.set(request.data, {
              id: id,
              img: users.get(request.data).img,
              status: true,
            });
          } else {
            users.set(request.data, { id, img: '', status: true });
          }
          client.send(
            JSON.stringify({
              action: 'LOGIN',
              sender: request.data,
              id,
              img: getImageByNickname(request.data),
              users: getOnlineNicknamesAndPictures(),
            })
          );
          server.clients.forEach((client) => {
            client.send(
              JSON.stringify({
                action: 'UPDATE',
                sender: request.data,
                data: `Пользователь ${request.data} подключился!`,
                img: getImageByNickname(request.data),
                users: getOnlineNicknamesAndPictures(),
              })
            );
          });
          break;
        case 'MESSAGE':
          server.clients.forEach((client) => {
            client.send(
              JSON.stringify({
                action: 'MESSAGE',
                sender: request.sender,
                nickname: getUserByID(request.sender),
                data: request.data,
                img: getImageByNickname(getUserByID(request.sender)),
              })
            );
          });
          break;
        case 'IMAGE':
          setNicknameImg(getUserByID(request.id), request.data);
          server.clients.forEach((client) => {
            client.send(
              JSON.stringify({
                action: 'IMAGE',
                nickname: getUserByID(request.id),
                data: request.data,
                users: getOnlineNicknamesAndPictures(),
              })
            );
          });
          break;
        default:
          console.log('Неизвестная команда');
          break;
      }
    } catch (error) {
      console.log('Ошибка', error);
    }
  });
  client.on('close', function () {
    const nickname = getUserByID(id);
    const tempUser = users.get(nickname);
    const img = tempUser.img || '';
    users.set(nickname, {
      id: '',
      img: img,
      status: false,
    });
    server.clients.forEach((clients) => {
      clients.send(
        JSON.stringify({
          action: 'LOGOUT',
          nickname: nickname,
          data: `Пользователь ${nickname} отключился!`,
          users: getOnlineNicknamesAndPictures(),
        })
      );
    });
  });
}
