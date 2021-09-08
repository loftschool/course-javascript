import InteractiveMap from './interactiveMap.js';

export default class GeoReview {
  constructor() {
    this.formTemplate = document.querySelector('#alternativeFormTemplate').innerHTML
    this.map = new InteractiveMap('map', this.onClick.bind(this));
    this.map.init().then(this.onInit.bind(this));
  }

  onInit() { //!
    const coords = Object.keys(localStorage)

    for (const coord of coords) {
      this.map.createPlacemark(JSON.parse(coord))
      console.log(JSON.parse(coord))
    }
  
    document.body.addEventListener('click', this.addReview.bind(this))
  }

  createForm(coords, reviews) {
    const root = document.createElement('div')
    root.innerHTML = this.formTemplate
    const reviewForm = root.querySelector('.review-balloon')
    const reviewList = root.querySelector('.review-balloon__list')
    reviewForm.dataset.coords = JSON.stringify(coords)

    for (const item of reviews) {
      const div = document.createElement('div')
      div.classList.add('review-item')
      div.innerHTML = `
      <div>
        ${item.name}.[${item.place}]
      </div>
      <div>${item.text}</div>
      `
      reviewList.appendChild(div)
    }

    return root
  }

  getReviews(coords) {
    const list = []
    
    for (const review in localStorage) {
      if (localStorage.hasOwnProperty(review) && JSON.stringify(coords) === review) {
        const reviewObj = JSON.parse(localStorage[review])
      list.push(reviewObj)
      } 
      
    }
    return list
  }

  onClick(coords) {
    const list = this.getReviews()
    const form = this.createForm(coords, list)
    this.map.openBalloon(coords, form.innerHTML)
    this.map.changeBalloonContent(form.innerHTML)
  }

  addReview(e) {
    if (e.target.dataset.role === 'review-add') {
      const reviewForm = document.querySelector('[data-role=review-form]')
      const coords = JSON.stringify(reviewForm.dataset.coords)

      const review = {
        name: document.querySelector('[data-role=review-name]').value,
        place: document.querySelector('[data-role=review-place]').value,
        text: document.querySelector('[data-role=review-text]').value
      }

      localStorage.setItem(coords, JSON.stringify(review) )
      console.log("review added with coords: " + coords)
    }
  }
}
