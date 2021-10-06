export function showServiceMessage(message) {
  const messages = document.querySelector('.messages');
  const serviceMessage = document.createElement('DIV');
  serviceMessage.classList.add('message', 'message--service');
  serviceMessage.textContent = message;
  messages.appendChild(serviceMessage);
}

export function showMessage(text, senderID, senderNickname, img) {
  const messages = document.querySelector('.messages');
  const message = document.createElement('DIV');
  const objectFit = img === './chat/img/photo.svg' ? 'none' : 'contain';
  const classes =
    window.id === senderID ? ['message', 'message--my', 'user'] : ['message', 'user'];
  message.classList.add(...classes);
  message.dataset.nickname = senderNickname;
  message.innerHTML = `
    <div class="user__nick">${senderNickname}</div>
      <div class="message__content">
        <div class="user__img">
          <img src=${img} width="33" height="33" data-nickname="${senderNickname}" style="object-fit: ${objectFit}">
        </div>
        <ul class="message__list">
          <li class="message__item">
            <div class="message__text">
              ${text}
              <span>${new Date(Date.now()).getHours()}:${new Date(
    Date.now()
  ).getMinutes()}</span>
            </div>
          </li>
        </ul>
      </div>
  `;
  messages.appendChild(message);
}
