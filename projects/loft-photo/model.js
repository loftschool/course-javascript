import { rejects } from "assert";
import { resolve } from "path";

const APP_ID = 51838147;
const PERM_FRIENDS = 2;
const PERM_PHOTOS = 4;

export default {
  getRandomElement(array) {
    if(!array.length){
      return null;
    }

    const index = Math.round(Math.random() * (array.length - 1));

    return array[index];
  },

  findSize(){
    const size = photo.sizes.find((size) => size.width >= 360);
  },

  async getNextPhoto() {
    const friend = this.getRandomElement(this.friend.item);
    const photos = await this.getRandomElement(friend.id);
    const photo = this.getRandomElement(photos.items);
    const size = this.findSize(photo)

    return {friend, id: photo.id, url: size.url};
  },

  login() {
    return new Promise((resolve,rejects) =>{
      VK.init({
        apId: APP_ID,
      });

      VK.Auth.login((response) =>{
        if(response.session){
          resolve(response)
        }else{
          console.error(response);
          rejects(response);
        }
      }, PERM_FRIENDS || PERM_PHOTOS)
    });
  },

  callApi(method, params){
    params.v = params.v || '5.120';

    return new Promise((resolve,rejects) =>{
      VK.api(method, params, (response) =>{
        if(response.error){
          rejects(new Error(response.error.error.msg));
        } else{
          resolve(response.response);
        };
      });
    });
  },

  async init() {
    this.photoCache = {};
    this.friend = await this.getFriends;
  },

  photoCache: {

  },

  getFriends(){
    const params ={
      field:['photo_50', 'photo_100']
    }
    return this.callApi('friends.get', params)
  },

  getPhotos(owner){
    const params = {
      owner_id: owner,
    };
    return this.callApi('photos.getAll', params)
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


