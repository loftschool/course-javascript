import LoginWindow from './ui/loginWindows';
import MainWindow from './ui/mainWindow';
import UserName from './ui/userName';

export default class MegaChat {
  constructor() {
    this.ui = {
      loginWindow: new LoginWindow(
        document.querySelector('#login'),
        this.onLogin.bind(this)
      ),
      mainWindow: new MainWindow(
        document.querySelector('#main'),
        this.onLogin.bind(this)
      ),
      userName: new UserName(
        document.querySelector('[data-role = user-name]'),
        this.onLogin.bind(this)
      ),
    };
    this.ui.loginWindow.show();
  }
  async onLogin(name) {
    this.ui.loginWindow.hide();
    this.ui.mainWindow.show();
    this.ui.userName.set(name);
  }
}
