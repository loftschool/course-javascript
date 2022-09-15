//* не рабочий template *//
// import { sanitize } from '../utils';
// import { from } from './../megaChat';
// import { sanitize } from './../megaChat';
// import { time } from './../megaChat';
// import { text } from './../megaChat';

const handlebars = require('handlebars');
// import Handlebars from 'handlebars';
// import Handlebars from 'handlebars/runtime';

export const messageItemTemplate =
  `
    <div class="message-item-left">
        <div
        style="background-image: url(/chat/photos/${from}.png?t=${Date.now()})" 
        class="message-item-photo" data-role="user-avatar" data-user=${sanitize(from)}>
        </div>
    </div>
    <div class="message-item-right">
      <div class="message-item-header">
          <div class="message-item-header-name">${sanitize(from)}</div>
          <div class="message-item-header-time">${time}</div>
      </div>
      <div class="message-item-text">${sanitize(text)}</div>
    </div>
    `;
