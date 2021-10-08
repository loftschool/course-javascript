const Model = require('./model');
const View = require('./view');
module.exports = {
  setFindsHandlers() {
    const findAll = document.querySelector('#find-all');
    const allList = document.querySelector('#left .app__list');
    findAll.addEventListener('input', (e) => {
      e.preventDefault();
      window.allSearchString = findAll.value;
      View.filter(window.allSearchString, allList);
    });
    const findFav = document.querySelector('#find-fav');
    const favList = document.querySelector('#right .app__list');
    findFav.addEventListener('input', (e) => {
      e.preventDefault();
      window.favSearchString = findFav.value;
      View.filter(window.favSearchString, favList);
    });
  },
  setAddArrowHandler() {
    const list = document.querySelector('#left .app__list');
    list.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('app__arrow')) {
        this.addToFavorite(e.target.parentElement);
        View.render(window.users);
        this.setHandlers();
      }
    });
  },
  setDeleteArrowHandler() {
    const list = document.querySelector('#right .app__list');
    list.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('app__arrow--close')) {
        this.deleteFromFavorite(e.target.parentElement);
        View.render(window.users);
        this.setHandlers();
      }
    });
  },
  addToFavorite(friend) {
    const favList = document.querySelector('#right .app__list');
    const arrow = friend.querySelector('.app__arrow');
    arrow.classList.remove('app__arrow');
    arrow.classList.add('app__arrow--close');
    favList.appendChild(friend);
    Model.saveItems();
    View.filter(window.favSearchString, favList);
    View.filter(window.allSearchString, document.querySelector('#left .app__list'));
  },
  deleteFromFavorite(friend) {
    const allList = document.querySelector('#left .app__list');
    const favList = document.querySelector('#right .app__list');
    const arrow = friend.querySelector('.app__arrow--close');
    arrow.classList.add('app__arrow');
    arrow.classList.remove('app__arrow--close');
    allList.appendChild(friend.cloneNode(true));
    favList.removeChild(friend);
    Model.saveItems();
    View.filter(window.favSearchString, favList);
    View.filter(window.allSearchString, allList);
  },
  setDragHandler(elements, dropZone) {
    function dragStartHandler(e) {
      window.draggedItem = this;
    }
    elements.forEach((li) => {
      li.addEventListener('dragstart', dragStartHandler, false);
    });
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      if (window.draggedItem.dataset.fav === 'true' && dropZone.id === 'left') {
        this.deleteFromFavorite(window.draggedItem);
        View.render(window.users);
        this.setHandlers();
      }
      if (window.draggedItem.dataset.fav === 'false' && dropZone.id === 'right') {
        this.addToFavorite(window.draggedItem);
        View.render(window.users);
        this.setHandlers();
      }
    });
  },
  setHandlers() {
    this.setFindsHandlers();
    this.setAddArrowHandler();
    this.setDeleteArrowHandler();
    this.setDragHandler(
      document.querySelectorAll('#left li'),
      document.querySelector('#right')
    );
    this.setDragHandler(
      document.querySelectorAll('#right li'),
      document.querySelector('#left')
    );
  },
};
