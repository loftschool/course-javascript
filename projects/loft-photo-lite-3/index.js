import pages from './pages';
import mainPage from './mainPage';
import loginPage from './loginPage';
import('./styles.css');

pages.openPage('login');
loginPage.handleEvents();
mainPage.handleEvents();
