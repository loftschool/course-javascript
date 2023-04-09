import model from './model';
import pages from './pages';
import mainPage from './mainPage';

export default {
  handleEvents() {

    document.querySelector('.page-login-button').addEventListener('click', async () => {
      // console.log('работа2')
      await model.login();
      // console.log('работа3')
      await model.init();
          // console.log('работа4')
      pages.openPage('main');
      await mainPage.getNextPhoto();
    });
  },
};
