import pages from './pages';
import model from './model';
import profilePage from './profilePage';
import commentsTemplate from './commentsTemplate.html.hbs';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    const photoStats = await model.photoStats(id);
    this.setFriendAndPhoto(friend, id, url, photoStats);
  },

  setFriendAndPhoto(friend, id, url, stats) {
    const photoComp = document.querySelector('.component-photo');
    const headerPhotoComp = document.querySelector('.component-header-photo');
    const headerNameComp = document.querySelector('.component-header-name');
    const footerPhotoComp = document.querySelector('.component-footer-photo');
    //сохраняем текущего друга, которого передали
    this.friend = friend;
    this.photoId = id;

    headerPhotoComp.style.backgroundImage = `url('${friend.photo_50}')`;
    headerNameComp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoComp.style.backgroundImage = `url(${url})`;
    //отображаем аватарку
    footerPhotoComp.style.backgroundImage = `url('${model.me.photo_50}')`;
    this.setLikes(stats.likes, stats.liked);
    this.setComments(stats.comments);
  },

  handleEvents() {
    let startFrom;

    document.querySelector('.component-photo').addEventListener('touchstart', (e) => {
      e.preventDefault();
      startFrom = { 
        y: e.changedTouches[0].pageY
      };
      startFrom = { 
        y: e.changedTouches[0].pageY 
      };
    });

    document.querySelector('.component-photo').addEventListener('touchend', async (e) => {
      const direction = e.changedTouches[0].pageY - startFrom.y;
      if (direction < 0) {
        await this.getNextPhoto();
      }
    });

    //обработчик клика на аватарку друга
    document.querySelector('.component-header-profie-link').addEventListener('click', async() => {
      await profilePage.setUser(this.friend);
      pages.openPage('profile');
    });
    //обработчик клика на свою аватарку
    document.querySelector('.component-footer-container-profile-link').addEventListener('click', async() => {
      await profilePage.setUser(model.me);
      pages.openPage('profile');
    });
    //обработчик клика на лайк
    document.querySelector('.component-footer-container-social-likes').addEventListener('click', async () => {
      const { likes, liked } = await model.like(this.photoId);
      this.setLikes(likes, liked);
    });
    //обработчик клика на значок комментария
    document.querySelector('.component-footer-container-social-comments').addEventListener('click', async () => {
      //убираем класс хидден для видимости
      document.querySelector('component-comments').classList.remove('hidden');
      await this.loadComments(this.photoId);
    });

    const input = document.querySelector('.component- comments-container-form-input');
    //обработчик скрытия списка
    document.querySelector('.component-comments').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        document.querySelector('.component-comments').classList.add('hidden');
      }
    });
    //обработчик отправки комментария
    document.querySelector('.component-comments-container-form-send').addEventListener('click', async () => {
      //обрезаем текст пользователя от пробелов и проверяем не пустая ли строка
      if (input.value.trim().length) {
        await model.postComment(this.photoId, input.value.trim());
        //очищаем инпут после отправки
        input.value = '';
        await this.loadComments(this.photoId);
      }
    });
  },
  async loadComments(photo) {
    const comments = await model.getComments(photo);
    const commentsElements = commentsTemplate({
      list: comments.map((comment) => {
        return {
          name: `${comment.user.first_name ?? ''} ${comment.user.last_name ?? ''}`,
          photo: comment.user.photo_50,
          text: comment.text,
        };
      }),
    });
    //очищаем предыдущие комментарии
    document.querySelector('.component-comments-container-list').innerHTML = '';
    document.querySelector('.component-comments-container-list').append(commentsElements);
    //обновляем счетчик
    this.setComments(comments.length);
  },
  setLikes(total, liked) {
    const likesElement = document.querySelector(
      '.component-footer-container-social-likes'
    );
    //пустанавливаем кол-во лайков
    likesElement.innerText = total;
    //если лайкнуто, добавляем класс. Если нет - убираем класс
    if (liked) {
      likesElement.classList.add('liked');
    } else {
      likesElement.classList.remove('liked')
    }
  },

  setComments(total) {
    const likesElement = document.querySelector(
      '.component-footer-container-social-comments'
    );
    //устанавливаем кол-во комментариев
    likesElement.innerText = total;
  },
};
