const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');
const fileName = 'database.json';

const wss = new WebSocket.Server({port: 5501});
let activeUsers = {};
let userWS = {};

wss.on('connection', function(websocket) {
    const clientId = uuidv1();
    userWS[clientId] = websocket;
    getClientCount();

    websocket.on('message', function(message) {
        const request = JSON.parse(message);
        let response = null, userId;
        switch (request.type) {
            case 'LOGIN':
                activeUsers[clientId] = {};
                activeUsers[clientId].name = request.clientName;
                websocket.send(JSON.stringify({
                    type: 'LOGIN_RESPONSE',
                    clientId: clientId,
                    activeUsers: activeUsers
                }));
                sendMessage({
                    type: 'NEW_ENTER',
                    userId: clientId,
                    userName: request.clientName
                }, clientId);
                break;
            case 'LOGOUT':
                console.log('LOGOUT')
                break;
            case 'NEW_MESSAGE':
                const msgContent = request.msgContent;
                userId = request.clientId;
                sendMessage({
                    type: 'NEW_MESSAGE',
                    userId: userId,
                    msgContent: msgContent
                }, userId);
                break;
            case 'NEW_AVATAR':
                userId = request.userId;
                const userImage = request.userImage;
                activeUsers[userId].image = userImage;
                sendMessage({
                    type: 'NEW_AVATAR',
                    userId: userId,
                    userImage: userImage
                }, userId);
                break;
            default:
                console.log('Unknown event');
                break;
        }
    });

    websocket.on('close', function(message){
        delete(activeUsers[clientId]);
        delete(userWS[clientId]);

        console.log('Соединение закрыто с пользователем ' + clientId);
        getClientCount();

        sendMessage({
            type: 'NEW_EXIT',
            userId: clientId
        });
    });
});

function getClientCount() {
    console.log('Количество пользователей ' + Object.keys(userWS).length);
}

function sendMessage(response, userId = '') {
    for (const key in userWS) {
        if (key !== userId)
        userWS[key].send(JSON.stringify(response));
    }
}