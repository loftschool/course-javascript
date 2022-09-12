import LoginWindow from './ui/loginWindow';
import MainWindow from './ui/mainWindow';
import UserName from './ui/userName';

export default class MegaChat {
  constructor() {
    this.ui = {
      loginWindow: new LoginWindow(
        document.querySelector('#login'),
        this.onLogin.bind(this)
      ),
      mainWindow: new MainWindow(document.querySelector('#main')),
      userName: new UserName(document.querySelector('[data-role=user-name]')),
    };

    this.ui.loginWindow.show();
  }

  async onLogin(name) {
    this.ui.loginWindow.hide();
    this.ui.mainWindow.show();
    this.ui.userName.set(name);
  }
}
