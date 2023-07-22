const pagesMap = {
    login: '.page-login',
    main: '.page-main',
    profile: '.page-profile',
  };

let currentPage = null;
  
  export default {
    openPage(name) {
        const selector = pagesMap[name];
        const element = document.querySelector(selector);

        currentPage?.classList.add('hidden');
        currentPage = element;
        currentPage.classList.remove('hidden');
    },
  };
  