import pages from './pages';
import model from './model';
import profilePage from './profilePage';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {
    const photoComp = document.querySelector('.component-photo');
    const headerPhotoComp = document.querySelector('.component-header-photo');
    const headerNameComp = document.querySelector('.component-header-name');
    const footerPhotoComp = document.querySelector('.component-footer-photo');
    //сохраняем текущего друга, которого передали
    this.friend = friend;

    headerPhotoComp.style.backgroundImage = `url('${friend.photo_50}')`;
    headerNameComp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoComp.style.backgroundImage = `url(${url})`;
    //отображаем аватарку
    footerPhotoComp.style.backgroundImage = `url('${model.me.photo_50}')`;
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
  },
};
