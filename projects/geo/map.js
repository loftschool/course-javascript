const storage = {
  add(obj) {
    let temp = sessionStorage.geo ? JSON.parse(sessionStorage.geo) : [];
    temp.push(obj);
    sessionStorage.geo = JSON.stringify(temp);
  },
  getAll() {
    return sessionStorage.geo ? JSON.parse(sessionStorage.geo) : [];
  }
}

let currentCoords;
let  currentId = 0;
const balloonContent = [
  '<p>Отзыв:</p>',
  '<p><input id="addName" type="text" placeholder="Укажите ваше имя"></p>',
  '<p><input id="addPlace" type="text" placeholder="Укажите место"></p>',
  '<p><textarea id="addComment" placeholder="Оставьте отзыв"></textarea> </p>',
  '<input type="button" id="sendComment" value="Отправить"/>'
].join('')

ymaps.ready(function() {
  myMap = new ymaps.Map('map', {
    center: [54.7057374, 20.5028727],
    zoom: 12
  }),
  
  myMap.events.add('click', (e) => {
    if (!myMap.balloon.isOpen()) {
      currentCoords = e.get('coords');
      myMap.balloon.open(currentCoords, {
        contentHeader: balloonContent
      });
    } else {
      myMap.balloon.close();
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.id === 'sendComment') {
      let obj = {
        name: document.querySelector('#addName').value,
        place: document.querySelector('#addPlace').value,
        comment: document.querySelector('#addComment').value,
        coord: [currentCoords[0], currentCoords[1]]
      };
    
      storage.add(obj)
      objectManager.add(createPlacemark(obj));
      myMap.balloon.close();
    }
  });
  
  let customBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    [                
      '{% for geoObject in properties.geoObjects %}',
          '<b>{{geoObject.properties.placemark.name}}</b>[{{geoObject.properties.placemark.place}}]<p>{{geoObject.properties.placemark.comment}}</p>',
      '{% endfor %}',
       balloonContent
    ].join(''));

  objectManager = new ymaps.ObjectManager({
    clusterize: true,
    clusterDisableClickZoom: true,
    clusterBalloonContentLayout: customBalloonContentLayout
  });

  this.objectManager.objects.events.add(['click'], function (e) {
    var object = objectManager.objects.getById(e.get('objectId'));
    currentCoords = object.geometry.coordinates
  });

  this.objectManager.clusters.events.add(['click'], function (e) {
      var cluster = objectManager.clusters.getById(e.get('objectId')),
      objects = cluster.properties.geoObjects;
      currentCoords = objects[0].geometry.coordinates
  });

  storage.getAll().forEach((item) => {
    objectManager.add(createPlacemark(item))
  })
  myMap.geoObjects.add(objectManager);
});

function createPlacemark(pm) {
  return {
    type: 'Feature',
    id: currentId++,
    geometry: {
        type: 'Point',
        coordinates: pm['coord']
    },
    properties: {
       balloonContentHeader: pm['name']+"["+pm['place']+"]<p>"+pm['comment']+"</p>",
       balloonContentBody: balloonContent,
       placemark: {
        name: pm['name'],
        place: pm['place'],
        comment: pm['comment']
      }
    }
  }
}