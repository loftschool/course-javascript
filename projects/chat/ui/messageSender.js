export default class MessageSender {
  constructor(element, onSend) {
    this.onSend = onSend;
    this.messageInput = element.querySelector('[data-role=message-input]');
    this.messageSendButton = element.querySelector('[data-role=message-send-button]');
    const app = document.querySelector('#app');

    this.messageSendButton.addEventListener('click', () => {
      const message = this.messageInput.value.trim();

      if (message) {
        this.onSend(message);
      }
    });

    document.addEventListener('keyup', (e) => {
      if (app.classList.contains('app-logged')) {
        if (e.keyCode === 13) {
          this.messageSendButton.click();
        }
      }
    });
  }

  clear() {
    this.messageInput.value = '';
  }
}
