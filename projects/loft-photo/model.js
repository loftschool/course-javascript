const PERM_FRIENDS = 2;
const PERM_PHOTOS = 4;
const APP_ID = 51710464; 

export default {
    getRandomElement(array) {
        if (!array.length) {
            return null;
        }

        const index = Math.round(Math.random() * (array.length - 1));

        return array[index];
    },

    async getNextPhoto() {
        const friend = this.getRandomElement(this.friends.items);
        const photos = await this.getFriendPhotos(friend.id);
        const photo = this.getRandomElement(photos.items);
        const size = this.findSize(photo);

        return { friend, id: photo, url: size.url }
    },

    findSize(photo) {
        const size = photo.sizes.find((size) => size >= 360);

        if (!size) {
            return photo.sizes.reduce((biggest, current) => {
                if (current.width > biggest.width) {
                    return curent;
                }

                return biggest;
            }, photo.sizes[0]);
        }

        return size;
    },

    login() {
        return new Promise((resolve, reject) => {
            VK.init({
                apiId: APP_ID,
            });

            VK.Auth.login((response) => {
                if (response.session) {
                    resolve(response);
                } else {
                    console.error(response);
                    reject(response);
                }
            }, PERM_FRIENDS | PERM_PHOTOS);
        });
    },

    async init() {
        this.photoCache = {};
        this.friends = await this.getFriends();
    },

    getFriends() {
        const params = {
            fields: ['photo_50', 'photo_100'],
        };

        return this.callApi('friends.get', params);
    },

    getPhotos(owner) {
        const params = {
            owner_id: owner,
        };

        return this.callApi('photos.getAll', params);
    },

    async getFriendPhotos(id) {
    const photos = this.photoCache[id];

    if (photos) {
        return photos;
    }

    photos = await this.getPhotos(id);

    this.photoCache[id] = photos;

    return photos;
    },
};