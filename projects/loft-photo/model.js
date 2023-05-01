// eslint-disable-next-line no-unused-vars
import photosDB from './photos.json';
// eslint-disable-next-line no-unused-vars
import friendsDB from './friends.json';



export default {
  getRandomElement(array) {
    // define the array length
    const len = array.length;

    // create function that allows to get a random number that includes min and max
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // get random int from array length
    let randomNum = getRandomIntInclusive(0, len-1);

    // return random number from the array parameter
    return array[randomNum];
  },
  
  getNextPhoto() {
    //create final object to return
    let resultObject = {};

    //access to databases
    const photosDB = require('./photos.json');
    const friendsDB = require('./friends.json');

    // define friends object length and create an array of it to pass to getRandomElement(which accepts only arrays!)
    const len = Object.keys(friendsDB).length;
    const arr = [...Array(len).keys()]
    const randomID = getRandomElement(arr);

    // get random friends name
    let friend = friendsDB[randomID].firstName; 

    // define photo object length and create an array of it to pass to getRandomElement(which accepts only arrays!)
    let photoLen = photosDB[randomID].length;
    const arrPhoto = [...Array(photoLen).keys()]
    let randomPhoto = getRandomElement(arrPhoto);

    // get random friends photo
    let photo = photosDB[randomID][randomPhoto].url;

    //add friend's name and photo to resulting object
    resultObject.friend = friend;
    resultObject.url = photo;

    return resultObject;
  },
};
