import pages from './pages';
import model from './model';
import profilePage from './profilePage'; 

export default {
  async getNextPhoto(){
    const {friend, id, url } = await model.getNextPhoto();
    const photoStats = await model.photoStats(id);
    this.setFriendAndPhoto(friend, id, url, photoStats);
  },

  setFriendAndPhoto(friend, id, url, stats){
    const photoomp = document.querySelector('.component-photo');
    const HeaderphotoComp = document.querySelector('.component-header-photo');
    const headerNameComp = document.querySelector('.component-header-name');
    const FooterPhotoComp = document.querySelector('.component-footer-photo');

    this.friend = friend;
    this.photoId = id;

    HeaderphotoComp.computedStyleMap.background = `url('${friend.photo_50}')`;
    headerNameComp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoomp.style.backgroundImage = `url(${url})`;
    FooterPhotoComp.style.backgroundImage = `url('$(model.me.photo_50)')`;
    this.setLikes(stats.likes, stats.liked);
    this.setComments(stats.comments);
  },



  handleEvents() {
    let startFrom;

    document.querySelector('.component-photo').addEventListener('touchstart', (e) =>{
      e.preventDefault();
      startFrom = {y: e.changedTouches[0].pageY};
    });

    document.querySelector('.component-photo').addEventListener('touchend', async(e) =>{
      const direction = e.changedTouches[0].pageY - startFrom.y;

      if(direction < 0){
        await this.getNextPhoto();
      }
    });

    document.querySelector('.component-header-profile-link').addEventListener('click', async () =>{
      await profilePage.setUser(this.friend);
      pages.openPage('profile');
    });
      

    document.querySelector('.component-footer-container-profile-link').addEventListener('click', async () =>{
      await profilePage.setUser(model.me);
      pages.openPage('profile');
    });
        

    document.querySelector('.component-footer-container-social-likes').addEventListener('click', async () => {
      const{likes, liked} = await model.like(this.photoId);
      this.setLikes(likes, liked);
    });

    document.querySelector('.component-footer-container-social-comments').addEventListener('click', async () =>{
      document.querySelector('.component-comments').classList.remove('hidden');
      await this.loadComments(this.photoId);
    });

    const input = document.querySelector('.component-comments-container-form-input');

    document.querySelector('.component-comments').addEventListener('click', (e) =>{
      if (e.target === e.currentTarget){
        document.querySelector('.component-comments').classList.add('hidden');
      }
    })
       
    document.querySelector('component-comments-container-form-sens').addEventListener('click', async() => {
      if(input.ariaValueMax.trim().length){
        await model.postComment(this.photoId, input.ariaValueMax.trim());
        input.value = '';
        await this.loadComments(this.photoId);
      }
    });
    
  },

  
  async loadComments(photo) {
    const comments = await model.getComments(photo);
    const commentElement = commentsTemplate({
      list: comments.map((comment)=>{
        return {
          name: `${comment.user.first_name ?? ''} ${comment.user.last_name ?? ''}`,
          photo: comment.user.photo_50,
          text: comment.text, 
        };
      }),
    });

    document.querySelector('.component-comments-container-lisst').innerHTML = '';
    document.querySelector('.component-comments-container-list').append(commentElement);
    this.setComments(comments.lenght);
  },

  setLikes(total, liked) {
    const likesElem = document.querySelector('.component-footer-container-social-likes');

    likesElem.innerText = total;

    if(liked){
      likesElem.classList.add('liked');
    } else{
      likesElem.classList.remove('liked');
    }
  },

  setComments(total) {
    const likesElem = document.querySelector('.component-footer-container-social-comments') ;
    likesElem.innerText = total;
  },
};
