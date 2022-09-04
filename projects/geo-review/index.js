import { formTemplates } from './templates';
import './yandex.html';
import './style.css';

let clusterer

document.addEventListener('DOMContentLoaded', () => ymaps.ready(init));

function init() {
    const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        control: ['zoomControl'],
        zoom: 12
    })

    myMap.events.add('click', function(e) {
        const coords = e.get('coords')

        openBalloon(myMap, coords, [])
    })

    clusterer = new ymaps.Clusterer({clusterDisableClickZoom: true})
    clusterer.options.set('hasBalloon', false)
    renderGeoObjects(myMap)

    clusterer.events.add('click', function(e) {
        let geoObjectsInCluster = e.get('target').getGeoObjects()
        openBalloon(myMap, e.get('coords'), geoObjectsInCluster)
    })
}

function getReviewsFromLS() {
    const reviews = localStorage.reviews
    return JSON.parse(reviews || '[]')
}

function getReviewList(currentGeoObjects) {
    let reviewListHTML = ''

    for (const review of getReviewsFromLS()) {
        if(currentGeoObjects.some(geoObject => JSON.stringify(geoObject.geometry._coordinates) === JSON.stringify(review.coords))) {
            reviewListHTML += `
                <div class="review">
                    <div class="review__author"><strong>${review.author}</strong></div>
                    <div class="review__place">${review.place}</div>
                    <div class="review__reviewText">${review.reviewText}</div>
                </div>
            `
        }
    }
    return reviewListHTML
}

function renderGeoObjects(map) {
    const geoObjects = []

    for (const review of getReviewsFromLS()) {
        const placemark = new ymaps.Placemark(review.coords)
        placemark.events.add('click', e => {
            e.stopPropagation();
            openBalloon(map, e.get('coords'), [e.get('target')])
        })
        geoObjects.push(placemark)
    }

    clusterer.removeAll()
    map.geoObjects.remove(clusterer)
    clusterer.add(geoObjects)
    map.geoObjects.add(clusterer)
}

async function openBalloon(map, coords, currentGeoObjects) {
    await map.balloon.open(coords, {
        content: `<div class="reviews">${getReviewList(currentGeoObjects)}</div>` + formTemplates
    })

    document.querySelector('#add-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const review = {
            coords,
            author: this.elements.author.value,
            place: this.elements.place.value,
            reviewText: this.elements.review.value,
        }

        localStorage.reviews = JSON.stringify([...getReviewsFromLS(), review])

        renderGeoObjects(map)

        map.balloon.close
    })
}
