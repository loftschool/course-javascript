const Model = require('./model');
const View = require('./view');
const Controller = require('./controller');
window.users = new Map();
window.favSearchString = '';
window.allSearchString = '';
Model.login(7968468, 2 | 8192)
  .then(() => {
    return Model.getFriends({ fields: 'photo_50' }).then((res) => {
      res.items.forEach((user) => {
        window.users.set(user.id + '', {
          first_name: user.first_name,
          last_name: user.last_name,
          photo_50: user.photo_50,
        });
      });
      View.render(window.users);
      Controller.setHandlers();
    });
  })
  .catch((e) => {
    console.error(e);
  });
