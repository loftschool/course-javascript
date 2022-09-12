export default class LoginWindow {
  constructor(element, onLogin) {
    this.element = element;
    this.onLogin = onLogin;

    const loginNameInput = element.querySelector('[data-role=login-name-input]');
    const submitButton = element.querySelector('[data-role=login-submit]');
    const loginError = element.querySelector('[data-role=login-error]');

    submitButton.addEventListener('click', () => {
      loginError.textContent = '';

      const name = loginNameInput.value.trim();

      if (!name) {
        loginError.textContent = 'Вы не ввели никнейм';
      } else {
        this.onLogin(name);
      }
    });
  }

  show() {
    this.element.classList.remove('hidden');
    const app = document.querySelector('#app');
    app.classList.remove('app-logged');
    app.classList.add('app-unlogged');
  }

  hide() {
    this.element.classList.add('hidden');
    const app = document.querySelector('#app');
    app.classList.add('app-logged');
    app.classList.remove('app-unlogged');
  }
}
