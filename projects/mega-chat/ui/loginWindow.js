export default class LoginWindow {
  //управляет окошком для логина
  constructor(element, onLogin) {
    this.element = element;
    this.onLogin = onLogin;

    // ссылки на html-элементы:
    const loginNameInput = element.querySelector('[data-role=login-name-input]'); // доступ для инпута: логин (никнейм)
    const submitButton = element.querySelector('[data-role=login-submit]'); // доступ для кнопки: войти
    const loginError = element.querySelector('[data-role=login-error]'); // доступ к диву, с сообщением об ошибке

    submitButton.addEventListener('click', () => {
      // обработчик кликов на кнопку: войти
      loginError.textContent = '';

      const name = loginNameInput.value.trim(); // берем текущее значение поля, куда вводим никнейм

      if (!name) {
        loginError.textContent = 'Введите никнейм'; // если ничего не ввели: ошибка
      } else {
        // если ввели, вызываем метод: onLogin - когда создаем экземпляр: LoginWindow ->
        //мы передаем функцию onLogin в конструктор (строка:2): она вызывается, когда пользователь введет логин и нажмет: Войти
        // --> далее обращаемся к - megaChat, строка 18
        this.onLogin(name); // вызываем метод onLogin и передаем туда имя пользователя - пробрасываем данные из окошка: логин
        //в связующий, промежуточный класс - в megaChat стр.58
      }
    });
  }

  show() {
    this.element.classList.remove('hidden'); // удаление класса hidden - показываем окошко авторизации
  }

  hide() {
    this.element.classList.add('hidden'); // после авторизации, добавляем hidden
  }
}
