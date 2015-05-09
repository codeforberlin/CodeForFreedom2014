require.config({
  paths: {
    leaflet: "/bower_components/leaflet/dist/leaflet",
    handlebars: "/bower_components/handlebars/handlebars.amd",
    jquery: "/bower_components/jquery/dist/jquery.min",
    omnivore: "/bower_components/leaflet-omnivore/leaflet-omnivore",
  }
});


require(["leaflet", "handlebars", "jquery", "omnivore"], function(L, handlebars, $, omnivore){
  "use strict";
  // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map("map").setView([52.505, 10.09], 4);

  // add an OpenStreetMap tile layer
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map);


  var countriesLayer = L.geoJson(null, { style:
                                          {
                                            fillColor: "#d8c92d",
                                            color: "#4cba6a"
                                          }
                                        }
                                 ).addTo(map);
  
  omnivore.topojson("/countries/codeforfreedom-countries.topojson", null, countriesLayer).addTo(map);


  // People from everywhere
  var people;
  $.getJSON("people/people.json", function(data) {
    people = data;
  })
  .done(function(){
    addPeople(people);
  });

  var mappedPeople = [];
  var source   = document.getElementById("popup-template").innerHTML;
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
