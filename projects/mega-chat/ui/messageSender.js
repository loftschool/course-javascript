export default class MessageSender {
  constructor(element, onSend) {
    this.onSend = onSend;
    this.messageInput = element.querySelector('[data-role=message-input]'); // ссылка на инпут, куда вводим сообщение
    this.messageSendButton = element.querySelector('[data-role=message-send-button]'); // кнопка отправить

    this.messageSendButton.addEventListener('click', () => {
      // обработчик кликов на отправить + ПОПРОБОВАТЬ С ENTER
      const message = this.messageInput.value.trim(); // берем текущее значение инпута

      if (message) {
        this.onSend(message); // если в поле для сообщений что-то введено, вызываем send, которая передается в конструкторе (стр.2)
      }
    });
  }

  clear() {
    this.messageInput.value = '';
  }
}
