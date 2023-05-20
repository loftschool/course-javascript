const pagesMap = {
    login: '.page-login',
    main: '.page-main',
    profile: '.page-profile',
  };

  export default {
    openPage(name) {
      let className = pagesMap[name];
      let divName = document.querySelector(className);

      divName.classList.remove('hidden');

      for (let key in pagesMap) {
        let checkClass = pagesMap[key];
        let otherDiv = document.querySelector(checkClass);

        if (!otherDiv.classList.contains('hidden') && otherDiv != divName) {
          otherDiv.classList.add('hidden');
        }
      }
    
    },
  };

  

  