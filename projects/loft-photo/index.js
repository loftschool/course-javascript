import pages from './pages';
import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

import mainPage from './mainPage';
import loginPage from './loginPage';

pages.openPage('login');
loginPage.handleEvents();
mainPage.handleEvents();
