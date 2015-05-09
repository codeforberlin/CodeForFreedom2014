require.config({
  paths: {
    leaflet: "../bower_components/leaflet/dist/leaflet",
    handlebars: "../bower_components/handlebars/handlebars.amd",
    omnivore: "../bower_components/leaflet-omnivore/leaflet-omnivore",
  }
});


require(["leaflet", "handlebars", "omnivore"], function(L, handlebars, omnivore){
  "use strict";
  // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map("map").setView([52.505, 10.09], 4);

  // add an OpenStreetMap tile layer
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map);

  var source   = document.getElementById("popup-template").innerHTML;
  var template = handlebars.compile(source);


  var countriesLayer = L.geoJson(null, { style:
                                          {
                                            fillColor: "#d8c92d",
                                            color: "#4cba6a"
                                          }
                                        }
                                 ).addTo(map);

  var peopleLayer = L.geoJson(null, {
                              onEachFeature: function (feature, layer) {
                                var content = template(layer.feature.properties.data);
                                layer.bindPopup(content);
                              }
                            });
  
  omnivore.topojson("./countries/codeforfreedom-countries.topojson", null, countriesLayer).addTo(map);

  omnivore.geojson("./people/people.json", null, peopleLayer).addTo(map);

});
