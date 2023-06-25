import pages from './pages';
import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

document.addEventListener('click', () => {
    const openBlock = getRandomElement(pageNames);
    openPage(openBlock);

});
