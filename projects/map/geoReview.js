import InteractiveMap from './interactiveMap';

export default class GeoReview {
  constructor() {
    this.map = new InteractiveMap('map', this.onClick.bind(this));
    this.map.init().then(this.onInit.bind(this));
  }

  async onInit() {}

  onClick(coords) {}
}
