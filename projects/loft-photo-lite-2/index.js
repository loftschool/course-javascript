import pages from './pages';
import('./styles.css');
import model from '../loft-photo-1/model';

const pageNames = ['login', 'main', 'profile'];

document.addEventListener('click', () => {
  const randomPage = model.getRandomElement(pageNames);

  pages.openPage(randomPage);
});
