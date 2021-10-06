const chatMenu = document.querySelector('.chat__menu');
const modal = document.querySelector('.modal');
const modalClose = modal.querySelector('.modal__close');

chatMenu.addEventListener('click', () => {
  modal.classList.remove('modal--hide');
});

modalClose.addEventListener('click', () => {
  modal.classList.add('modal--hide');
});
