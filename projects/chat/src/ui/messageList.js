export default class MessageList {
  constructor(element) {
    this.element = element;
  }

  add(from, text) {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, 0);
    const time = `${hours}:${minutes}`;
    const item = document.createElement('div');

    item.classList.add('message-item');
    item.innerHTML = `
      <div class="message-item-left">
        <div class="message-item-photo" data-id="user-avatar" data-user=${from}>
        </div>
      </div> 
      <div class="message-item-right">
        <div class="message-item-header">
          <div class="message-item-header-name">${from}</div>
          <div class="message-item-header-time">${time}</div>
        </div>
        <div class="message-item-text">${text}</div>
      </div>
      `;
    this.element.append(item);
    this.element.scrollTop = this.element.scrollHeight;
  }

  addSystemMessage(message) {
    const item = document.createElement('div');

    item.classList.add('message-item', 'message-item-system');
    item.textContent = message;

    this.element.append(item);
    this.element.scrollTop = this.element.scrollHeight;
  }
}
