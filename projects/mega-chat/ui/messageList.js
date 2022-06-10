import { sanitize } from '../utils';

export default class MessageList {
  constructor(element) {
    this.element = element;
  }

  add(from, text) {
    // генерируем html, сообщение
    const date = new Date(); // определяем текущую дату
    const hours = String(date.getHours()).padStart(2, 0);
    const minutes = String(date.getMinutes()).padStart(2, 0);
    const time = `${hours}:${minutes}`;
    const item = document.createElement('div'); // создаем див

    item.classList.add('message-item'); // добавляем ему класс и аштиэмэлим
    item.innerHTML = ` 
    <div class="message-item-left">
        <div
        style="background-image: url(/mega-chat/photos/${from}.png?t=${Date.now()})" 
        class="message-item-photo" data-role="user-avatar" data-user=${sanitize(
          from
        )}></div>
    </div>
    <div class="message-item-right">
      <div class="message-item-header">
          <div class="message-item-header-name">${sanitize(from)}</div>
          <div class="message-item-header-time">${time}</div>
      </div>
      <div class="message-item-text">${sanitize(text)}</div>
    </div>
    `;

    this.element.append(item); // добавляем это сообщение в список наших сообщений
    this.element.scrollTop = this.element.scrollHeight;
  }

  addSystemMessage(message) {
    const item = document.createElement('div'); // создает новый элемент типа див

    item.classList.add('message-item', 'message-item-system'); // задает ему класс
    item.textContent = message; // задает текстовое содержимое

    this.element.append(item); // добавляет его в список сообщений
    this.element.scrollTop = this.element.scrollHeight; // при скролле новое сообщение прибиваем к низу инпута
  }
}
