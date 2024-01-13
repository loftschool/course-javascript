const pagesMap = {
    login: '.page-login',
    main: '.page-main',
    profile: '.page-profile',
  };

  let currentPage = null;
  
  export default {
    openPage(name) {
        const page = pagesMap[name];
        const element = document.querySelecto(page);

        currentPage?.classList.add('hiden');
        currentPage = element;
        currentPage.classList.remove('hiden');
    },
  };
  