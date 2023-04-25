const map = L.map("map").setView([40.774009,14.789533], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


function locate() {
    map.on("locationfound", function (evt) {
        const latlng = evt.latlng;
        const radius = evt.accuracy;

        L.marker(latlng).addTo(map).bindPopup("Ti trovi in un raggio di <b>" + radius + "</b> metri da questo punto");

        L.circle(latlng, {
            color: "red",
            radius: radius
        }).addTo(map);
    });
    map.locate({setView: true, maxZoom: 16});
}


function featureString(feature) {
    return "<b>" + feature.properties.NOME + "</b>"
        + "<br><br><b>Provincia</b>: " + feature.properties.NOME_PROV
        + "<br><b>Area</b>: " + feature.properties.Area
        + "<br><b>Codice</b>: " + feature.properties.ISTAT;
}


function loadVector() {
    const url = "http://localhost:8080/leaflet-tutorial-1.0-SNAPSHOT/geo/comuni.geojson";

    $.getJSON(url, function (data) {
       const comuniLayer = L.geoJSON(data, {
           style: function (feature) {
               if (feature.properties.Area > 3000) {
                   return {
                       color: "red",
                       weight: 3
                   }
               }
           },
           filter: function (feature) {
               return feature.properties.Area > 2000;
           },
           onEachFeature: function (feature, layer) {
                layer.bindPopup(featureString(feature));
                layer.on("mouseover", function () {
                    layer.setStyle({
                        color: "white"
                    });
                });
               layer.on("mouseout", function () {
                   comuniLayer.resetStyle(layer);
               })
           }
       }).addTo(map);

       map.fitBounds(comuniLayer.getBounds());
    });
}