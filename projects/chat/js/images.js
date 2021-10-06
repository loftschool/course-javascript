const imgInput = document.querySelector('.modal__file input');
const modaldrop = document.querySelector('.modal__file');

imgInput.addEventListener('change', (e) => {
  e.preventDefault();
  encodeAndSend(e.currentTarget.files[0]);
});

modaldrop.addEventListener('dragover', (e) => {
  e.preventDefault();
  console.log('drag drag drag');
});

modaldrop.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.preventDefault();
  const dt = e.dataTransfer;
  const files = dt.files;
  encodeAndSend(files[0]);
});

function encodeAndSend(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    window.connection.send(
      JSON.stringify({
        action: 'IMAGE',
        id: window.id,
        data: reader.result,
      })
    );
  };
}

export function updateUsersPicture(users) {
  for (const nickname of Object.keys(users)) {
    const userImagesContainers = document.querySelectorAll(
      `img[data-nickname=${nickname}]`
    );
    userImagesContainers.forEach((img) => {
      const objectFit = users[nickname] === '' ? 'none' : 'contain';
      img.style.objectFit = objectFit;
      img.src = users[nickname] || './chat/img/photo.svg';
    });
  }
}
