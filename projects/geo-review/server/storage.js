const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');

class Storage {
  constructor() {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, '{}');
      this.data = {};
    } else {
      this.data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
  }

  validateCoords(coords) {
    if (!Array.isArray(coords) || coords.length !== 2) {
      throw new Error('Invalid coords data');
    }
  }

  validateReview(review) {
    if (!review || !review.name || !review.place || !review.text) {
      throw new Error('Invalid review data');
    }
  }

  getIndex(coords) {
    return `${coords[0]}_${coords[1]}`;
  }

  add(data) {
    this.validateCoords(data.coords);
    this.validateReview(data.review);
    const index = this.getIndex(data.coords);
    this.data[index] = this.data[index] || [];
    this.data[index].push(data.review);
    this.updateStorage();
  }

  getCoords() {
    const coords = [];

    for (const item in this.data) {
      coords.push({
        coords: item.split('_'),
        total: this.data[item].length,
      });
    }

    return coords;
  }

  getByCoords(coords) {
    this.validateCoords(coords);
    const index = this.getIndex(coords);
    return this.data[index] || [];
  }

  updateStorage() {
    fs.writeFile(dataPath, JSON.stringify(this.data), () => {});
  }
}

module.exports = Storage;
