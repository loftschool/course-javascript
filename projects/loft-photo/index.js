import mainPage from './mainPage';
import loginPage from './loginPage';

pages.openPage('login');
loginPage.handleEvents();
mainPage.handleEvents();

document.addEventListener('click', () => {
    const pages = pageNames;

    var randomIndex = Math.floor(Math.random() * pages.length);
    var randomElem = pages[randomIndex]

    pages.OpenPage(randomElem)
});

