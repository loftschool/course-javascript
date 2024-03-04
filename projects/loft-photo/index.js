import pages from './pages';
import model from './model';

import mainPage from './mainPage';
import loginPage from './loginPage';

import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

pages.openPage('login');
loginPage.handleEvents();
mainPage.handleEvents();

