/* eslint-disable prettier/prettier */
import { formTemplate, reviewTemplate } from './templates'
import './style.css'
import './yandex.html'
import { addReview, getReviews } from './db'

let myMap
let clusterer

document.addEventListener('DOMContentLoaded', () => {
    ymaps.ready(init)
})

function init() {
    myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        controls: ['zoomControl'],
        zoom: 12
    })

    myMap.events.add('click', function (mapEvent) {
        const coords = mapEvent.get('coords');
        myMap.balloon.open(coords, formTemplate)
        
        delayAddReviewSubmit(myMap, mapEvent)
    })

    clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        gridSize: 512
    })

    clusterer.events.add('click', function(clusterEvent) {
        const geoOjectsInCluster = clusterEvent.get('target').getGeoObjects()

        const content = ymaps.templateLayoutFactory.createClass(`<div class="reviews">${getReviewList(geoOjectsInCluster)}</div>`)

        clusterEvent.get('target').options.set({clusterBallonContentLayout: content})

    })

    getGeoObjects()
}

function getGeoObjects() {
    const geoObjects = [];

    for (const review of getReviews() || []) {
        const placemark = new ymaps.Placemark(review.coords, {
            balloonContent: `<div class="reviews">${getReviewList(review.coords, true)}</div>` + formTemplate
        })

        placemark.events.add('click', placemarkEv => {
            placemarkEv.stopPropagation();
            delayAddReviewSubmit(placemark, placemarkEv)
        })

        geoObjects.push(placemark)
    }

    clusterer.removeAll()
    myMap.geoObjects.remove(clusterer)
    clusterer.add(geoObjects)
    myMap.geoObjects.add(clusterer)
}

function getReviewList(currentGeoObjects, isCoords) {
    let reviewListHTML = ''

    if (isCoords) {
        const review = getReviews().find(rev => JSON.stringify(rev.coords) === JSON.stringify(currentGeoObjects))
        reviewListHTML += reviewTemplate(review)
    } else {
        for (const review of getReviews()) {
            if (currentGeoObjects.find(geoObject => {
                return JSON.stringify(review.coords) === JSON.stringify(geoObject.geometry._coordinates)
            })) {
                reviewListHTML += reviewTemplate(review)
            }
        }
    }

    return reviewListHTML
}

function delayAddReviewSubmit(geoObject, geoObjectEvent) {
    setTimeout(() => {
        document.querySelector('#add-form').addEventListener('submit', function (e) {
            e.preventDefault()
            const review = {
                coords: geoObjectEvent.get('coords'),
                author: this.elements.author.value,
                place: this.elements.place.value,
                reviewText: this.elements.review.value
            }

            addReview(review)
            getGeoObjects()
            geoObject.balloon.close()
        })
    }, 0);
}
