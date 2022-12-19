const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(async (req, res) => {
  res.end('ok');
});

const wss = new WebSocket.Server({ server });
const connections = new Map();

wss.on('connection', (socket) => {
  connections.set(socket, {});

  socket.on('message', (messageData) => {
    const message = JSON.parse(messageData);
    let excludeSelf = false;

    if (message.type === 'hello') {
      excludeSelf = true;
      connections.get(socket).userName = message.data.name;
      sendMessageTo(
        {
          type: 'user-list',
          data: [...connections.values()].map((item) => item.userName).filter(Boolean),
        },
        socket
      );
    }
    sendMessageFrom(connections, message, socket, excludeSelf);
  });

  socket.on('close', () => {
    sendMessageFrom(connections, { type: 'buy-buy' }, socket);
    connections.delete(socket);
  });
});

function sendMessageTo(message, to) {
  to.send(JSON.stringify(message));
}

function sendMessageFrom(connections, message, from, excludeSelf) {
  const socketData = connections.get(from);

  if (!socketData) {
    return;
  }

  message.from = socketData.userName;

  for (const connection of connections.keys()) {
    if (connection === from && excludeSelf) {
      continue;
    }

    connection.send(JSON.stringify(message));
  }
}

server.listen(8080);
