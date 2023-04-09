import model from './model';
import mainPage from './mainPage';
import pages from './pages';

export default {
  
  async setUser(user) {
    const photoComp = document.querySelector('.component-user-info-photo');
    const nameComp = document.querySelector('.component-user-info-name');
    const photosComp = document.querySelector('.component-user-photos');
    const photos = await model.getPhotos(user.id);

    this.user = user;

    photoComp.style.backgroundImage = `url('${user.photo_100}')`;
    nameComp.innerText = `${user.first_name ?? ''} ${user.last_name ?? ''}'`;
    photosComp.innerHTML = '';

    for (const photo of photos.items) {
      const size = model.findSize(photo);
      const element = document.createElement('div');

      element.classList.add('component-user-photo');
      element.dataset.id = photo.id;
      element.style.backgroundImage = `url(${size.url})`;
      photosComp.append(element);
    }
  },

  handleEvents() {

    document
        .querySelector('.component-user-photos')
        .addEventListener('click', async (e) => {
    
          if (e.target.classList.contains('component-user-photo')) {
          const photoId = e.target.dataset.id;
          const friendsPhotos = await model.getPhotos(this.user.id);
          const photo = friendsPhotos.items.find((photo) => photo.id == photoId);
          const size = model.findSize(photo);
          
          mainPage.setFriendAndPhoto(this.user, parseInt(photoId), size.url);
          pages.openPage('main');
        }
      });

    document
        .querySelector('page-profile-back').addEventListener('click', () => {
          pages.openPage('main');
        });

    document
        .querySelector('page-profile-exit').addEventListener('click', async () => {
          await model.logout();
          pages.openPage('login');
        });

  },
};
