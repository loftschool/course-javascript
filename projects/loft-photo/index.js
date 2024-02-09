import mainPage from './mainPage';
import loginPage from './loginPage';
import profilePage from './profilePage'; // в верхней части

pages.openPage('login');
loginPage.handleEvents();
mainPage.handleEvents();

document.addEventListener('click', () => {
    const pages = pageNames;

    var randomIndex = Math.floor(Math.random() * pages.length);
    var randomElem = pages[randomIndex]

    pages.OpenPage(randomElem)
});


profilePage.handleEvents(); // в нижней части

