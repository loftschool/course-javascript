export default class MessageSender {
  constructor(element, onSend) {
    this.onSend = onSend;
    this.messageInput = document.querySelector('[data-id=chat-input-message]');
    this.messageSendButton = document.querySelector('[data-id=chat-input-btn]');

    this.messageSendButton.addEventListener('click', () => {
      const message = this.messageInput.value.trim();

      if (message) {
        this.onSend(message);
      }
    });
  }

  clear() {
    this.messageInput.value = '';
  }
}
