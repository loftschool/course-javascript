import './connection';

const form = document.querySelector('#send');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = form.querySelector('.input').value;
  const request = {
    action: 'MESSAGE',
    sender: window.id,
    data: message,
  };
  window.connection.send(JSON.stringify(request));
  form.reset();
});
