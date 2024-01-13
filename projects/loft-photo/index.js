import pages from './pages';
import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

document.addEventListener('click', () => {
    const pages = pageNames;

    var randomIndex = Math.floor(Math.random() * pages.length);
    var randomElem = pages[randomIndex]

    pages.OpenPage(randomElem)
});

