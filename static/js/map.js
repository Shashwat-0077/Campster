mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: campLoc.coordinates, // starting position [lng, lat]
  zoom: 10 // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(campLoc.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h3>${title}`)
  )
  .addTo(map)