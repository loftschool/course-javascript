const ws = new WebSocket('ws://localhost:5501');
let clientId = null;
let clientName = null;
let avatar = null;
const defaultAvatar = 'img/ava.jpg';
let activeUsers = {};

const loginBlock = document.getElementById('login_block');
const loginButton = document.getElementById('login_button');
const loginName = document.getElementById('login_name');

const chatBlock = document.getElementById('chat_block');
const clientNameBlock = document.getElementById('client_name');
const listBlock = document.getElementById('user_list');
const messageBlock = document.getElementById('message_block');
const messageText = document.getElementById('message_text');
const sendButton = document.getElementById('send_button');
const clientImage = document.getElementById('client_image');


const messageTpl = Handlebars.compile(
    '<div class="msg-main" user="{{msg_author_id}}">' +
        '<img class="msg-image" src="{{msg_image}}"></img>' +
        '<div class="msg-content">' +
            '<div class="msg-top">' +
                '<div class="msg-author">{{msg_author}}</div>' +
                '<div class="msg-time">{{msg_time}}</div>' +
            '</div>' +
            '<div class="msg-text">{{msg_text}}</div>' +
        '</div>' +
    '</div>'
);


loginButton.addEventListener('click', auth);
loginName.addEventListener('change', auth);

sendButton.addEventListener('click', sendMessage);
messageText.addEventListener('change', sendMessage);

ws.onmessage = function (message){
    const response = JSON.parse(message.data);
    let userId, userName, userImage;
    switch(response.type){
        case 'LOGIN_RESPONSE':
            clientId = response.clientId;
            activeUsers = response.activeUsers;
            refreshUserList();
            if (clientId) {
                loginBlock.classList.add('hide');
                chatBlock.classList.remove('hide');
            }
            break;
        case 'NEW_MESSAGE':
            userId = response.userId;
            const msgContent = response.msgContent;
            msgContent.msg_author_id = userId;
            msgContent.msg_author = activeUsers[userId].name;
            msgContent.msg_image = activeUsers[userId].image || defaultAvatar;
            const msg = document.createElement('div');
            msg.innerHTML = messageTpl(msgContent);
            messageBlock.appendChild(msg);
            break;
        case 'NEW_ENTER':
            userName = response.userName;
            activeUsers[response.userId] = {};
            activeUsers[response.userId].name = userName;
            const li = document.createElement('li');
            li.textContent = userName;
            listBlock.appendChild(li);

            const enter = document.createElement('div');
            enter.textContent = userName + ' зашел в чат';
            messageBlock.appendChild(enter);

            refreshUserList();
            break;
        case 'NEW_EXIT':
            userName = activeUsers[response.userId].name;
            for (const node of listBlock.children) {
                if (node.textContent === userName) {
                    listBlock.removeChild(node);
                }
            }

            const exit = document.createElement('div');
            exit.textContent = userName + ' вышел из чата';
            messageBlock.appendChild(exit);

            delete(activeUsers[response.userId]);
            refreshUserList();
            break;
        case 'NEW_AVATAR':
            userId = response.userId;
            userImage = response.userImage;
            activeUsers[userId].image = userImage;
            updateAvatar(userId);
            break;
        default:
            console.log('Unknown Response');
            break;

    }
}

ws.onopen = function() {
    console.log('Client Connected');
}

document.addEventListener('dragstart', (e) => {
    e.dataTransfer().setData('text/html', 'dragstart');
});
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});
document.addEventListener('drop', (e) => {
    e.preventDefault();
});
clientImage.addEventListener('drop', (e) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    if (dt.files && dt.files.length) {
        const reader = new FileReader();

        reader.readAsDataURL(dt.files[0]);
        reader.addEventListener('load', () => {
            clientImage.src = reader.result;
            avatar = reader.result;

            const request = {
                type: 'NEW_AVATAR',
                userId: clientId,
                userImage: reader.result
            }
            ws.send(JSON.stringify(request));
            updateAvatar(clientId);
        });
    }
});

function sendMessage(event) {
    event.preventDefault();
    if (messageText.value !== '') {
        const msg_time = getCurrentTime();
        const msgContent = {
            msg_time: msg_time,
            msg_text: messageText.value,
        };
        
        const request = {
            type: 'NEW_MESSAGE',
            clientId: clientId,
            msgContent: msgContent
        }
        ws.send(JSON.stringify(request));

        const msg = document.createElement('div');
        msgContent.msg_author = clientName;
        msgContent.msg_author_id = clientId;
        msgContent.msg_image = avatar || defaultAvatar;
        msg.innerHTML = messageTpl(msgContent);
        messageBlock.appendChild(msg);
    }
    messageText.value = '';
}

function auth(event){
    event.preventDefault();
    clientName = loginName.value.toString();
    clientNameBlock.textContent = clientName;
    const request = {
        type: 'LOGIN',
        clientName: clientName
    }
    ws.send(JSON.stringify(request))
    loginName.value = '';
}

function refreshUserList() {
    listBlock.textContent = '';
    for (const key in activeUsers) {
        const li = document.createElement('li');
        li.textContent = activeUsers[key].name;
        listBlock.appendChild(li);
    }
}

function updateAvatar(userId) {
    let userImage;
    if (userId === clientId) {
        userImage = avatar;
    } else {
        userImage = activeUsers[userId].image || defaultAvatar;
    }
    
    for (const child of messageBlock.children) {
        if (child.firstElementChild && child.firstElementChild.getAttribute('user') === userId) {
            child.firstElementChild.firstElementChild.src = userImage;
        }
    }
}

function getCurrentTime() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (minute < 10) minute = '0' + minute;
    if (hour < 10) hour = '0' + hour;

    return hour + ':' + minute + ' ' + day + '.' + month + '.' + year;
}
