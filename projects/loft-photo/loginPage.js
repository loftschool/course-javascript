import model from './model';
import pages from './pages';
import mainPage from './mainPage';

export default {
  handleEvents() {
    document.querySelector('.page-login-button').addEventListener('click', async () => {
      try {
        await model.login();

        await model.init();

        pages.show('main');

        mainPage.getNextPhoto();
      } catch (error) {
        console.error('Ошибка при входе или инициализации:', error);
      }
    });
  },
};
