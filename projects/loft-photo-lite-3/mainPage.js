import { doc } from 'prettier';
import model from './model';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {
    const photoComp = document.querySelector('.component-photo');
    const headerPhotoComp = document.querySelector('.component-header-photo');
    const photoNameComp = document.querySelector('.component-header-name');

    photoComp.style.backgrounImage = `url(${url})`;
    headerPhotoComp.style.backgrounImage = `url('${frind.photo_50}')`;
    photoNameComp.innerText = `${fiend.first_name ?? ''} ${frind.last_name ?? ''}`;
  },

  handleEvents() {
    let startFrom;

    document.querySelector('.component-photo').addEventListener('touchstart', (e) => {
      e.preventDefault();
      startFrom = {y: e.changedTouches[0].pageY};
    });

    document.querySelector('.component-photo').addEventListener('touchend', async (e) => { 
      const direction = e.changedTouches[0].pageY - startFrom.y;
      if (direction < 0) {
        await this.getNextPhoto();
      }
    });
  },
};
