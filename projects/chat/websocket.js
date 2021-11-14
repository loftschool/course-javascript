const moment = require('moment');
const { WebSocketServer } = require('ws');
const port = parseInt(process.env.WS_PORT) || 8088;
const webSocketServer = new WebSocketServer({ port: port });

const clients = new Map();

webSocketServer.on('connection', (ws) => {
  ws.on('message', function (messageData) {
    const message = JSON.parse(messageData);
    const name = message.user.name;

    switch (message.type) {
      case 'userJoin': {
        const client = clients.get(name) || {};
        client.ws = ws;
        client.name = name;
        clients.set(name, client);
        sendEvent('userJoin', name, clients.get(name).avatar);
        userList(name);
        break;
      }
      case 'msg': {
        sendEvent('msg', name, clients.get(name).avatar, message.text);
        break;
      }
      case 'updateUser': {
        const client = { ws: ws, avatar: message.user.avatar };
        clients.set(message.user.name, client);
        sendEvent('updateUser', name, clients.get(name).avatar);
        break;
      }
    }
  });

  ws.on('close', function () {
    for (const name of clients.keys()) {
      if (clients.get(name).ws === ws) {
        const client = { ws: null, avatar: clients.get(name).avatar };
        clients.set(name, client);
        sendEvent('userLeft', name, clients.get(name).avatar);
      }
    }
  });
});

function sendEvent(type, user, photo, message = '') {
  const data = {
    type: type,
    time: moment().format('HH:mm'),
    text: message,
    user: {
      name: user,
      avatar: photo,
    },
  };
  for (const name of clients.keys()) {
    if (!clients.get(name).ws) {
      continue;
    }
    clients.get(name).ws.send(JSON.stringify(data));
  }
}

function userList(user) {
  const array = [];
  for (const name of clients.keys()) {
    if (!clients.get(name).ws) {
      continue;
    }
    array.push({ name: name, avatar: clients.get(name).avatar });
  }

  const data = {
    type: 'list',
    users: array,
  };
  clients.get(user).ws.send(JSON.stringify(data));
}
