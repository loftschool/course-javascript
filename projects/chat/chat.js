import LoginWindow from '../chat/src/ui/loginWindow';
import UserName from '../chat/src/ui/userName';
import MainWindow from '../chat/src/ui/mainWindow';
import UserList from '../chat/src/ui/userList';
import MessageList from '../chat/src/ui/messageList';
import MessageSender from '../chat/src/ui/messageSender';
import WSClient from './wsClient';

export default class MyChat {
  constructor() {
    this.wsClient = new WSClient(
      `ws://${location.host}/chat/ws`,
      this.onMessage.bind(this)
    );

    this.ui = {
      loginWindow: new LoginWindow(
        document.querySelector('#enter'),
        this.onLogin.bind(this)
      ),
      mainWindow: new MainWindow(document.querySelector('#chat')),
      userName: new UserName(document.querySelector('[data-id=user-name]')),
      userList: new UserList(document.querySelector('[data-id=user-list]')),
      messageList: new MessageList(document.querySelector('[data-id=message-list]')),
      messageSender: new MessageSender(
        document.querySelector('[data-id=message-sender]'),
        this.onSend.bind(this)
      ),
    };

    this.ui.loginWindow.show();
  }

  async onLogin(name) {
    await this.wsClient.connect();
    this.wsClient.sendHello(name);
    this.ui.loginWindow.hide();
    this.ui.mainWindow.show();
    this.ui.userName.set(name);
  }

  onMessage({ type, from, data }) {
    console.log(type, from, data);

    if (type === 'hello') {
      this.ui.userList.add(from);
      this.ui.messageList.addSystemMessage(`${from} вышел из чата`);
    } else if (type === 'user-list') {
      for (const item of data) {
        this.ui.userList.add(item);
      }
    } else if (type === 'bye-bye') {
      this.ui.userList.remove(from);
      this.ui.messageList.removeSystemMessage(`${from} вышел из чата`);
    } else if (type === 'text-message') {
      this.ui.messageList.add(from, data.message);
    }
  }
}
