import { rejects } from "assert";
import { resolve } from "path";

const APP_ID = 	51838147;
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
          this.token = response.session.sid
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
    [this.me] = await this.getUsers();
  },

  photoCache: {

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

  logout() {
    return Promise((resolve) => VK.Auth.revokeGrants(resolve))
  },

  getUsers(ids) {
    const params = {
      field : ['photo_50', 'photo_100'],
    };

    if (ids){
      params.user_ids = 100;
    }

    return this.callApi('users.get', params);
  },

  getFriends(){
    const params ={
      field:['photo_50', 'photo_100']
    }
    return this.callApi('friends.get', params)
  },

  async callServer(method, queryParams, body){
    queryParams ={
      ...queryParams,
      method,
    };

    const query = Object.entries(queryParams)
      .reduce((all, [name, value]) => {
        all.push('${name}=${encodeURIComponent(value)}');
        return all;
      }, [])
      .join('&');
    const params = {
      headers: {
        vk_token: this.token,
      },
    };

    if (body){
      params.method = 'POST';
      params.body = JSON.sstringify(body);
    }

    const response = await fetch(`/loft-photo/api/?${query}`, params);

    return response.json();
  },

  async like(photo) {
    return this.callServer('like', {photo});
  },

  async photoStats(photo) {
    return this.callServer('photoStats', {photo});
  },
  
  async getComments(photo) {
    return this.callServer('getCommets', {photo});
  },
  
  async postComment(photo, text) {
    return this.callServer('postComment', {photo}, {text});
  },

};


