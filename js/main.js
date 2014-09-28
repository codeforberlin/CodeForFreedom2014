require.config({
  paths: {
    leaflet: "//cdn.leafletjs.com/leaflet-0.7.3/leaflet"
  }
});


require(["leaflet"], function(L){
  "use strict";
  // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map("map").setView([52.505, 10.09], 6);

  // add an OpenStreetMap tile layer
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map);


  // Selected countries
  var countries;
  $.getJSON("countries/codeforfreedom-countries.geojson", function(data) {
    countries = data;
  })
  .done(function(){
    L.geoJson(countries, { style: {
      fillColor: "#d8c92d",
      color: "#4cba6a"
    }}).addTo(map);
  });


  // People from everywhere
  var people;
  $.getJSON("people/people.json", function(data) {
    people = data;
  })
  .done(function(){
    add_people(people);
  });

  var mappedPeople = [];
  function add_people(data){
    map.removeLayer(mappedPeople);
    mappedPeople = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        // TODO: Render popup
        var content =
            '<h1 class="person">' + layer.feature.properties.data.name + '<\/h1>' +
            '<p class="social">Twitter: ' + layer.feature.properties.data.twitter + '<\/p>' +
            '<p class="social">Github: <a href="http:\/\/github.com\/' + layer.feature.properties.data.github + '">' + layer.feature.properties.data.github + '<a><\/p>';
        layer.bindPopup(content);
      }
    }).addTo(map);
  }

});
