import model from './model';
import profilePage from './profilePage';
import pages from './pages';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {
    const photoComp = document.querySelector('.component-photo');
    const headerPhotoComp = document.querySelector('.component-header-photo');
    const photoNameComp = document.querySelector('.component-header-name');
    const footerPhotoComp = document.querySelector('.component-footer-photo');

    this.friend = friend;

    photoComp.style.backgrounImage = `url(${url})`;
    headerPhotoComp.style.backgrounImage = `url('${frind.photo_50}')`;
    photoNameComp.innerText = `${fiend.first_name ?? ''} ${frind.last_name ?? ''}`;
    footerPhotoComp.style.backgrounImage = `url('${model.me.photo_50}')`;
  },

  handleEvents() {
    let startFrom;

    document.querySelector('.component-photo').addEventListener('touchstart', (e) => {
      e.preventDefault();
      startFrom = { y: e.changedTouches[0].pageY };
    });

    document.querySelector('.component-photo').addEventListener('touchend', async (e) => {
      const direction = e.changedTouches[0].pageY - startFrom.y;
      if (direction < 0) {
        await this.getNextPhoto();
      }
    });

     document
       .querySelector('.component-header-profile-link')
       .addEventListener('click', async () => {
          await profilePage.setUser(this.friend);
          pages.openPage('profile');
       });

      document
      .querySelector('.component-footer-container-profile-link')
      .addEventListener('click', async () => {
        await profilePage.setUser(this.me);
        pages.openPage('profile');
      });

  },
};
