import pages from './pages';
import model from '../loft-photo/model'
import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

document.addEventListener('click', () => {
    let page = model.getRandomElement(pageNames);
    pages.openPage(page);
});
