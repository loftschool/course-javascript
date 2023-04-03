## Комментарии и лайки

> Возьмите за основу свое решение из предыдущей недели

### Часть 1

HTTP-cервер для хранения лайков и комментов.

Сервер представляет собой хранилище количества лайков и комментариев к каждому фото.

Сервер принимает несколько видов запросов:

#### `GET /loft-photo-5/api/?method=like&photo=PHOTO_ID`

Добавляет к фото 1 лайк.

В параметре photo передается id фотографии.

#### `POST /loft-photo-5/api/?method=postComment&photo=PHOTO_ID`

Добавляет комментарий к фото.

В параметре photo передается id фотографии. В свойстве text тела запроса передается текст комментария.

#### `GET /loft-photo-5/api/?method=getComments&photo=PHOTO_ID`

Возвращает список комментариев к фото.

В параметре photo передается id фотографии.

#### `GET /loft-photo-5/api/?method=photoStats&photo=PHOTO_ID`

Возвращает количество лайков и комментов к фото.

В параметре photo передается id фотографии.

В каждом запросе передается header `vk_token`, который нужен чтобы удостовериться от какого пользователя происходит запрос.

Внутри себя сервер принимает запрос, удостоверяется в подлинности пользователя, выполняет действие (например, ставит лайк) и возвращает ответ.

**Шаг 1:**

Реализуйте в файле [server/index.js](server/index.js) методы:

- `like(req, res, url, vkUser)` - лайкнуть фото или снять лайк, если этот пользователь уже лайкнул фото
- `postComment(req, res, url, vkUser, body)` - опубликовать коммент к фото
- `getComments(req, res, url)` - получить список комментов к фото
- `photoStats(req, res, url, vkUser)` - получить количество лайков и комментов к фото

Обратите внимание, что в исходном коде сервера уже есть переменная `DB` для хранения лайков и комментов, используйте ее.

### Часть 2

Поддержать работу с сервером

**Шаг 1:**

В файле модели реализуйте методы, которые будут обращаться к серверу при помощи fetch:

- `like`
- `photoStats`
- `getComments`
- `postComment`

> fetch-запросы следует отправлять по адресу /loft-photo-lite-5/api/

С каждым запросом отправляйте header `vk_token`. Токен можно взять из `response.session.sid` в промисе авторизации в VK.

**Шаг 2:**

На главной странице, при отображении фотографии, получите статистику по фотографии и передайте ее в параметре `stats` метода `setFriendAndPhoto`.

Так же реализуйте методы:

- `setLikes` - Устанавливает количество лайков фотографии в элемент `.component-footer-container-social-likes`. Если текущий пользователь поставил лайк этой фотографии, то иконка сердечка должна быть красной.
- `setComments` - Устанавливает количество комментов фотографии в элемент `.component-footer-container-social-comments`.

Вызывайте эти методы при проличтывании фото, чтобы загружать статистику фотографии

**Шаг 3:**

На главной странице добавьте обработчики событий на следующие элементы:

- `.component-footer-container-social-likes` - Вызывает метод `like` модели и обновить счетчик лайков
- `.component-footer-container-social-comments` - Показать контейнер с комментами (`.component-comments`)
- `.component-comments-container-form-send` - Вызвать метод `postComment` модели и передать текст коммента из инпута `.component-comments-container-form-input`

**Шаг 4:**

Реализовать на главной странице метод `loadComments`, который будет загружать и отображать список комментариев. Этот метод нужно вызывать при клике на иконку комментариев.

Пример handlebars-шаблона для каждого комментария:

```handlebars
{{#each list}}
  <div class="component-comment">
      <div class="component-comment-photo" style="background-image: url('{{photo}}')"></div>
      <div class="component-comment-content">
          <div class="component-comment-name">{{name}}</div>
          <div class="component-comment-text">{{text}}</div>
      </div>
  </div>
{{/each}}
```

Вы можете создавать файлы с расширением `html.hbs` импортировать их в своей сборке. Например:

```js
import commentsTemplate from './commentsTemplate.html.hbs';

// ...

const commentsElements = commentsTemplate({ list: comments });
listElement.appendChild(commentsElements);
```
