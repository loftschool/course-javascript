import model from './model';
import profilePage from './profilePage';
import pages from './pages';

export default {
    async getNextPhoto() {
        const { friend, id, url } = await model.getNextPhoto();
        const photoStats = await model.photoStats(id);
        this.setFriendAndPhoto(friend, id, url, photoStats);
    },

    setFriendAndPhoto(friend, id, url, stats) {
        const photoComp = document.querySelector('.component-photo');
        const headerPhotoComp = document.querySelector('.component-header-photo');
        const photoNameComp = document.querySelector('.component-header-name');
        const footerPhotoComp = document.querySelector('.component-footer-photo');

        this.friend = friend;
        this.photoId = id;

        photoComp.style.backgrounImage = `url(${url})`;
        headerPhotoComp.style.backgrounImage = `url('${frind.photo_50}')`;
        photoNameComp.innerText = `${fiend.first_name ?? ''} ${frind.last_name ?? ''}`;
        footerPhotoComp.style.backgrounImage = `url('${model.me.photo_50}')`;
        this.setLikes(stats.likes, stats.liked);
        this.setComments(stats.comments);
    },

    handleEvents() {
        let startFrom;

        document.querySelector('.component-photo').addEventListener('touchstart', (e) => {
            e.preventDefault();
            startFrom = { y: e.changedTouches[0].pageY };
        });

        document.querySelector('.component-photo').addEventListener('touchend', async (e) => {
            const direction = e.changedTouches[0].pageY - startFrom.y;
            if (direction < 0) {
                await this.getNextPhoto();
            }
        });

        document
            .querySelector('.component-header-profile-link')
            .addEventListener('click', async () => {
                await profilePage.setUser(this.friend);
                pages.openPage('profile');
            });

        document
            .querySelector('.component-footer-container-profile-link')
            .addEventListener('click', async () => {
                await profilePage.setUser(this.me);
                pages.openPage('profile');
            });

        document 
        .querySelector('.component-footer-container-social-likes')
        .addEventListener('click', async () => {
            const {likes, liked} = await model.like(this.photoId);
            this.setLikes(likes, liked);
        })

        document
        .querySelector('.component-footer-container-social-comments')
        .addEventListener('click', async () => {
           document.querySelector('.component-components').classList.remove('hidden');
           await this.loadComments(this.photoId);
        })

        const input = document.querySelector('.component-comments-container-form-input');

        document
            .querySelector('.component-comments').addEventListener('click', (e) => {
                if (e.target === e.currentTarget) {
                    document.querySelector('.component-comments').classList.add('hidden');
                }
            });

        document
            .querySelector('.component-comments-container-form-send')
            .addEventListener('click', async () => {
                if(input.ariaValueMax.trim().length) {
                    await model.postComment(this.photoId, input.value.trim());
                    input.value = '';
                    await this.loadComments(this.photoId);
                }
            })

    },

    async loadComments(photo) {
        const comments = await model.getComments(photo);
        const commentsElements = commentsTemplate({
            list: comments.map((comment) => {
                return {
                    name: `${comment.user.first_name ?? ''} ${comment.user.last_name ?? ''}`,
                    photo: comment.user.photo_50,
                    text: comment.text,
                }
            })
        })

        document.querySelector('.component-comments-container-list').innerHTML = '';
        document.querySelector('.component-comments-container-list').append(commentsElements);
        this.setComments(comments.length);
    },

    setLikes(total, liked) {
        const likesElement = document.querySelector('.component-footerj-container-social-likes');
        
        likesElement.innerText = total;

        if(liked) {
            likesElement.classList.add('liked');
        } else {
            likesElement.classList.remove('liked');
        }
    },

    setComments(total) {
        const likesElement = document.querySelector('.component-footer-container-social-comments');
        likesElement.innerHTML = total;
    },
};
