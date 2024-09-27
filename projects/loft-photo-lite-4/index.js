import pages from './pages';
import mainPage from './mainPage';
import profilePage from './profilePage';
import loginPage from './loginPage';
import('./styles.css');

pages.openPage('login');
loginPage.handleEvents();
mainPage.handleEvents();
profilePage.handleEvents();
