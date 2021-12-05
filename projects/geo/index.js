import './index.html';
import './style.css';
import reviewTemplate from './reviewTemplate.hbs'

document.addEventListener('DOMContentLoaded', function() {
  let coords = [];
  let reviews = [];


  const balloonContent = [
      '<div class="review-form">',
        '<div class="review-form__content">',
          '<div class="review-form__title">Отзыв</div>',
          '<input type="text" class="review-form__input" id="name" name="name" placeholder="Укажите ваше имя">',
          '<input type="text" class="review-form__input" id="place" name="place" placeholder="Укажите место">',
          '<textarea class="review-form__input textarea" id="review" name="review" placeholder="Оставить отзыв"></textarea>',
        '</div>',
        '<div class="review-form__footer">',
        '<button class="review-form__btn">Добавить</button>',
        '</div>',
      '<div>'
    ].join('')
  

  ymaps.ready(init);
  function init(){

      var myMap = new ymaps.Map("map", {
          center: [55.76, 37.64],
          zoom: 7
      });

      const clusterer = new ymaps.Clusterer({
        hasBalloon: false,
        clusterDisableClickZoom: true,
      });
  
      myMap.events.add('click', function (e) {
        coords = e.get('coords');

        myMap.balloon.open(coords, {
          contentBody: balloonContent
        });

        document.addEventListener('click', function(e) {
          const target = e.target;
          
          if(target.className === 'review-form__btn') {
            let review = {
                  name : document.querySelector('#name').value.trim(),
                  place : document.querySelector('#place').value.trim(),
                  review : document.querySelector('#review').value.trim(),
                  latitude: coords[0],
                  longitude: coords[1]
                };

              reviews.push(review);
              let placemark = new ymaps.Placemark([coords[0], coords[1]], {});
              clusterer.add(placemark);
              myMap.geoObjects.add(clusterer);
              myMap.balloon.close();

              placemark.events.add('click', function(e) {

                // console.log(e.get('target'));
                // let [currentLatitude, currentLongitude] = placemark.geometry.getCoordinates();
              //   const findReviews = reviews.filter(review => currentLatitude === review.latitude) || (currentLongitude === review.longitude)
                
              //   const html = reviewTemplate({findReviews});

              //   myMap.balloon.open([currentLatitude, currentLongitude], {
              //     contentBody: html + balloonContent + 'placemark'
              //   });
              })

              clusterer.events.add('click', function (e) {
                let geoObjectState = clusterer.getObjectState(placemark)
                console.log(geoObjectState.cluster);
                // console.log(e.get('target').geometry.getCoordinates());
                // console.log(reviews);
                // let [currentLatitude, currentLongitude] = placemark.geometry.getCoordinates();
                let [currentLatitude, currentLongitude] = placemark.geometry.getCoordinates();

                const findReviews = reviews.filter(review => currentLatitude === review.latitude) || (currentLongitude === review.longitude);
                // console.log(findReviews);
                const html = reviewTemplate({findReviews});
                myMap.balloon.open(e.get('target').geometry.getCoordinates(), {
                  contentBody: html + balloonContent + 'cluster'
                });
              });
              
              
          }
        });
      });

      
  }
});
