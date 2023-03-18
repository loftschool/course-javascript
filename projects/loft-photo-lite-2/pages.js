const pagesMap = {
  login: '.page-login',
  main: '.page-main',
  profile: '.page-profile',
};

export default {
  openPage(name) {
    const className = pagesMap[name];
    const element = document.querySelector(className);
    const classArray = Object.values(pagesMap);

    classArray.forEach((currentClass) => {
      const currentElement = document.querySelector(currentClass);

      if (!currentElement.classList.includes('hidden')) {
        currentElement.classList.add('hidden');
      }
    });

    element.classList.remove('hidden');
  },
};
