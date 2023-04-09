const pagesMap = {
  login: '.page-login',
  main: '.page-main',
  profile: '.page-profile',
};

let currPage = 0;

export default {

  openPage(name) {
    console.log('работа',name);
    const selector = pagesMap[name];
    const el = document.querySelector(selector);
    console.log(el);
    currPage?.classList?.add('hidden');
    currPage = el;
    currPage?.classList?.remove('hidden');

    // const selector = pagesMap[name];
    // const el = document.querySelector(selector);

    // if (currPage != 0) {
    //   currPage.classList.add('hidden');
    // }
    // else
    // if (currPage === el) {
    //   currPage.classList.remove('hidden');
    // }
  },
};