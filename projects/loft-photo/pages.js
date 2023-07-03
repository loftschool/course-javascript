const pagesMap = {
  login: '.page-login',
  main: '.page-main',
  profile: '.page-profile',
};

export default {
  openPage(name) {
    const selector = pagesMap[name];
    const clickblock = document.querySelector(selector);
    const logBlock = document.querySelector('.page-login');
    const mainBlock = document.querySelector('.page-main');
    const profileBlock = document.querySelector('.page-profile');

    logBlock.classList.add('hidden');
    mainBlock.classList.add('hidden');
    profileBlock.classList.add('hidden');

    clickblock.classList.remove('hidden');
  },
};
