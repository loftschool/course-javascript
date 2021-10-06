import './connection';
const authForm = document.querySelector('.form');
authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = authForm.querySelector('#name').value;
  const request = {
    action: 'LOGIN',
    sender: window.id,
    data: nickname,
  };
  window.connection.send(JSON.stringify(request));
});
