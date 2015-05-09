require.config({
  paths: {
    leaflet: "/bower_components/leaflet/dist/leaflet",
    handlebars: "/bower_components/handlebars/handlebars.amd",
    jquery: "/bower_components/jquery/dist/jquery.min"
  }
});


require(["leaflet", "handlebars", "jquery"], function(L, handlebars, $){
  "use strict";
  // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map("map").setView([52.505, 10.09], 4);

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
    addPeople(people);
  });

  var mappedPeople = [];
  var source   = $("#popup-template").html();
  var template = handlebars.compile(source);

  function addPeople(data){
    map.removeLayer(mappedPeople);
    mappedPeople = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        // TODO: Render popup
        var content = template(layer.feature.properties.data);
        layer.bindPopup(content);
      }
    }).addTo(map);
  }

});
