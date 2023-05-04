let comuniLayer;

const map = L.map("map").setView([40.774009,14.789533], 16);

L.control.scale().addTo(map);

const layersControl = L.control.layers().addTo(map);

const osmBaseLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const gmapBaseLayer = L.tileLayer('http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.google.com/intl/it_it/help/terms_maps/">Google</a>'
}).addTo(map);


layersControl.addBaseLayer(gmapBaseLayer, "Satellite");
layersControl.addBaseLayer(osmBaseLayer, "OpenStreeMap");



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
       comuniLayer = L.geoJSON(data, {
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

                    layer.bringToFront();

                    $('#infobox').append(featureString(feature));
                });
               layer.on("mouseout", function () {
                   comuniLayer.resetStyle(layer);

                   $('#infobox').empty();
               });
           }
       }).addTo(map);

       map.fitBounds(comuniLayer.getBounds());
       layersControl.addOverlay(comuniLayer, "Comuni");
    });
}

function search() {
    const query = $('#query').val();

    const comuni = comuniLayer.getLayers();

    for (const comuneLayer of comuni) {
        if (comuneLayer.feature.properties.NOME.toUpperCase() === query.toUpperCase()) {
            //map.flyToBounds(comuneLayer.getBounds());
            map.removeLayer(comuneLayer);
        }
    }
}

function loadRaster() {
    const url = "http://localhost:8080/leaflet-tutorial-1.0-SNAPSHOT/geo/tmax.png";
    const bounds = [[40.6221200000000024, 14.7305200000000003], [40.8102799999999988, 15.1457200000000007]];

    const tmaxLayer = L.imageOverlay(url, bounds, {
        opacity: 1
    }).addTo(map);

    map.fitBounds(tmaxLayer.getBounds());
    layersControl.addOverlay(tmaxLayer, "Temperature massime");
}

function loadKML() {
    // Load kml file
    fetch('geo/Vesuvio.kml')
        .then(function (res) {
            return res.text()
        })
        .then(function (kmlText) {
            // Create new kml overlay
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmlText, 'text/xml');

            const vesuvioLayer = new L.KML(kml);
            map.addLayer(vesuvioLayer)

            // Adjust map to show the kml
            const bounds = vesuvioLayer.getBounds();
            map.fitBounds(bounds);

            layersControl.addOverlay(vesuvioLayer, "KML");
        });

}

function marker(feature, latlng) {
    return L.circleMarker(latlng, {
        color: "red",
        radius: 3
    })
}

function heatmap() {
    $.getJSON("geo/terremoti.geojson", function (data) {
        const terremotiLayer = L.geoJSON(data, {
            pointToLayer: marker
        });

        const points = terremotiLayer.getLayers();

        const pointsCoordinates = points.map(function (point) {
            const latlng = point.getLatLng();
            const mag = point.feature.properties.Mag;

            return [latlng.lat, latlng.lng, mag];
        });


        L.heatLayer(pointsCoordinates, {
            radius: 25,
            maxZoom: 8,
            max: 10,
        }).addTo(map);
    });
}