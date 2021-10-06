import { showAuthWindow, showMainWindow, renderUserList, setUserData } from './main';
import { showServiceMessage, showMessage } from './messageHandler';
import { updateUsersPicture } from './images';

window.connection = new WebSocket('ws://localhost:8081');

window.connection.onmessage = function (e) {
  const response = JSON.parse(e.data);
  switch (response.action) {
    case 'LOGIN':
      window.id = response.id;
      showMainWindow();
      renderUserList(response.users);
      setUserData(response.sender, response.img);
      break;
    case 'UPDATE':
      renderUserList(response.users);
      showServiceMessage(response.data);
      break;
    case 'IMAGE':
      updateUsersPicture(response.users);
      break;
    case 'MESSAGE':
      showMessage(response.data, response.sender, response.nickname, response.img);
      break;
    case 'LOGOUT':
      showServiceMessage(response.data);
      renderUserList(response.users);
      break;
    default:
      throw new Error('Unknown command');
  }
};

window.connection.onclose = function () {
  const request = {
    action: 'LOGOUT',
    sender: window.id,
  };
  window.connection.send(JSON.stringify(request));
  showAuthWindow();
};
