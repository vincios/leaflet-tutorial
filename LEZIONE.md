[comment]: <> (cSpell:language it)

# Leaflet
Leaflet è una libreria javascript che permette di integrare mappe interattive in pagine web.

Leaflet mette a disposizione una vasta libreria di funzioni che permettono aggiungere, visualizzare, modificare e interagire con oggetti georeferenziati, mappe, layers e controlli in pagine web. Inoltre, offre un cospicuo numero di eventi che permettono di "reagire" alle interazioni che l'utente effettua sulle mappe.

Tutte operazioni sulle mappe vengono effettuate tramite script JavaScript, semplicemente eseguendo le funzioni messe a disposizione dalla libreria. Sarà quest'ultima poi ad occuparsi di inserire nella pagina web tutti gli elementi html necessari per visualizzare e interagire con gli oggetti delle mappe.

## Setup
Prima di poter utilizzare tutte le funzioni messe a disposizione da Leaflet, è necessario compiere alcuni passaggi per l'inizializzazione della libreria.

1. Includiamo la libreria nella pagina html

    - Nella sezione `head` del documento includiamo il file CSS di Leaflet

        ```html
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
        ```

    - In fondo alla sezione `body` del documento includiamo il file JavaScript della libreria

        ```html
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>
        ```

2. Aggiungiamo alla pagina html un `div` vuoto, con un `id` definito

   💡 Tale `div` verrà riempito da Leaflet con le nostre mappe

    ```html
    <div id="map"></div>
    ```

3. Aggiungiamo lo stile del `div` (ad esempio, in un file CSS)

   Leaflet richiede che **l'altezza** del `div` abbia un valore assoluto e non in percentuale (relativo all'altezza di un'altro elemento).

   Possiamo utilizzare quindi come unità di misura `px` per definire un'altezza fissa del contenitore o, per un layout responsivo, `vh`

    ```css
    #map {
        height: 95vh;
    }
    ```

   💡 L'unità di misura `vh` (viewport height) è relativa all'altezza finestra del browser. Ad esempio, 95vh equivale al 95% dell'altezza della finestra

4. Inizializziamo la libreria Leaflet in uno script JavaScript

   Leaflet definisce un oggetto globale `L` che contiene tutte le funzioni necessarie per poter creare i nostri oggetti geografici (punti, linee, poligoni, layers, ...) e i controlli per poter interagiore con le mappe.

   Il primo passo è utilizzare oggetto `L` per creare un oggetto di tipo [`Map`](https://leafletjs.com/reference.html#map). Quest'ultimo rappresenta la nostra mappa sulla pagina web e potremo poi utilizzarlo per interagire con essa e per aggiungervi gli oggetti geografici.

   Creiamo quindi il nostro oggetto [`Map`](https://leafletjs.com/reference.html#map) con la funzione [`L.map(id)`](https://leafletjs.com/reference.html#map-l-map), a cui passiamo come parametro l'id del `div` della pagina html in cui Leaflet mostrerà le nostre mappe.

   Poi, con la funzione [`setView(coord, zoom)`](https://leafletjs.com/reference.html#map-setview) impostiamo le coordinate geografiche e il livello di zoom di un punto geografico dove inizializzare la mappa.

    ```js
    const map = L.map('map').setView([40.771840,14.791722], 13);
    ```


    > 💡 Molte funzioni della libreria Leaflet accettano, come ultimo parametro opzionale, un oggetto JSON di opzioni che è possibile configurare. La documentazione ufficiale di Leaflet indica, per ciascuna funzione, quali sono le opzioni che è possibile configurare.
    >
    > Ad esempio, a questo indirizzo è possibile consultare quali opzioni è possibile configurare alla creazione dell'oggetto `Map`: [https://leafletjs.com/reference.html#map-l-map](https://leafletjs.com/reference.html#map-l-map).

5. Aggiungiamo una mappa base

   Il primo layer che aggiungiamo alla mappa è la cartografia della Terra, utilizzando il servizio di tiles che ci viene offerto da OpenStreetMap.

   Creiamo quindi un oggetto di tipo [`TileLayer`](https://leafletjs.com/reference.html#tilelayer) con la apposita funzione [`L.tileLayer(url, options)`](https://leafletjs.com/reference.html#tilelayer-l-tilelayer), alla quale passiamo un parametro con l'url del servizio di OpenStreetMap e un parametro di opzioni:

    - `maxZoom`: livello massimo di zoom che è possibile effettuare sul layer
    - `attribution`: una stringa di copyright che attribuisce la fonte dei dati a OpenStreetMap. Tutti i fornitori richiedono che venga aggiunta tale stringa di attribuzione quando si utilizzano i loro servizi. Quando si utilizza un servizio esterno, è quindi importante controllare sempre i termini di utilizzo.

   Infine, con la funzione [`addTo(map)`](https://leafletjs.com/reference.html#layer-addto) aggiungiamo il layer appena creato alla nostra mappa.

    ```js
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    ```

   > 💡 Tutti gli oggetti creati con l'oggetto globale `L` di Leaflet hanno una funzione `addTo()` per poter essere aggiunti a una mappa


6. Aggiungiamo qualche elemento alla mappa:

    - **Un punto**: creiamo un oggetto [`Marker`](https://leafletjs.com/reference.html#marker) con la funzione [`L.marker(coord, options)`](https://leafletjs.com/reference.html#marker-l-marker). Come parametro passiamo le coordinate geografiche dove posizionare il punto

        ```js
        var marker = L.marker([40.771840,14.791722]).addTo(map);
        ```

    - **Una circonferenza**: creiamo un oggetto [`Circle`](https://leafletjs.com/reference.html#circle) con la funzione [`L.circle(coord, options)`](https://leafletjs.com/reference.html#circle-l-circle). Come parametri passiamo le coordinate geografiche del centro della circonferenza e un oggetto di opzioni per definire lo stile della circonferenza e il suo raggio, in metri

        ```js
        var circle = L.circle([40.776840,14.796722], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);
        ```

    - **Un poligono**: creiamo un oggetto di tipo [`Polygon`](https://leafletjs.com/reference.html#polygon) con la funzione [`L.polygon(vertexCoords)`](https://leafletjs.com/reference.html#polygon-l-polygon), il cui parametro sarà la lista di coordinate geografiche dei vertici del poligono

        ```js
        var polygon = L.polygon([
            [40.775634,14.780739],
            [40.776455,14.788374],
            [40.771190,14.785196]
        ]).addTo(map);
        ```

   💡 Nota come tutti gli oggetti sono stati aggiunti alla mappa utilizzando le rispettive funzioni `addTo(map)`

7. Aggiungiamo un popup

   I popup sono comodi per allegare alcune informazioni a un particolare oggetto sulla mappa.

   Tutti gli oggetti geografici hanno una funzione [`bindPopup(content)`](https://leafletjs.com/reference.html#layer-bindpopup) che permette di aggiungere un popup al click sull'oggetto. Il parametro `content` è una stringa del testo contenuto nel popup (può contenere anche codice html)

    ```js
    marker.bindPopup("<b>Prova</b><br>Ecco popup.").openPopup();
    circle.bindPopup("Sono un cerchio");
    ```

# Localizzarci sulla mappa
Un oggetto di tipo [`Map`](https://leafletjs.com/reference.html#map) offre una funzione [`locate(options)`](https://leafletjs.com/reference.html#map-locate) che permette di individuare le coordinate geografiche in è localizzato l'utente.

La posizione individuata non è mai esatta. Leaflet individua sempre un raggio (in metri) in cui dovrebbe trovarsi l'utente.

Se la localizzazione dell'utente riesce con successo, l'oggetto [`Map`](https://leafletjs.com/reference.html#map) lancia un evento [`locationfound`](https://leafletjs.com/reference.html#map-locationfound) che possiamo catturare con un event listener per ottenere le informazioni sulla localizzazione dell'utente ed, eventualmente, effettuare delle operazioni con tali dati.

Creiamo quindi nella nostra pagina web un pulsante per localizzare l'utente sulla mappa.

1. Aggiungiamo nella pagina html un pulsante "Localizza" che, al click, esegue una funzione `localizza()`

    ```html
    <div id="controls">
        <button type="button" onclick="localizza()">Localizza</button>
    </div>
    ```

2. Creiamo la funzione `localizza()` in uno script JavaScript

   In questa funzione, eseguiamo la funzione [`locate(options)`](https://leafletjs.com/reference.html#map-locate) dell'oggetto `map` che abbiamo costruito in precedenza. Passiamo, come parametro, un oggetto JSON con due opzioni

    - `setView`: se `true`, sposta la mappa sulla posizione dell'utente individuata
    - `maxZoom`: oltre a spostare la mappa, effettua anche uno zoom sul punto, fino al livello massimo di zoom indicato da questa opzione

    ```js
    function localizza() {
        map.locate({setView: true, maxZoom: 16});
    }
    ```

3. Catturiamo l'evento [`locationfound`](https://leafletjs.com/reference.html#map-locationfound) sulla mappa, **PRIMA** della funzione `map.locate()`

   Con la funzione `map.on(event, listenerFunc)` Leaflet eseguirà la funzione `listenerFunc` quando l'oggetto `map` lancia l'evento `event`. Utilizziamo quindi tale funzione per catturare l'evento [`locationfound`](https://leafletjs.com/reference.html#map-locationfound) e ottenere le informazioni riguardo la localizzazione dell'utente. Fondamentalmente il raggio dove viene localizzato l'utente è una circonferenza, quindi tali informazioni comprendono le coordinate geografiche del centro della circonferenza e il suo raggio in metri.

    ```js
    function locate() {
        map.on("locationfound", function (evt) {
            var latlng = evt.latlng;
            var radius = evt.accuracy;
        });

        map.locate({setView: true, maxZoom: 16});
    }
    ```

   Quando viene lanciato l'evento [`locationfound`](https://leafletjs.com/reference.html#map-locationfound) Leaflet passa alla funzione `listenerFunc`, nel parametro `evt`, le informazioni sul raggio in cui è stato individuato l'utente in due proprietà

    - `evt.latlng`: coordinate geografiche del centro di circonferenza del raggio individuato
    - `evt.accuracy`: raggio (in metri) della circonferenza

4. Mostriamo sulla mappa le informazioni sulla localizzazione dell'utente

   Grazie alle informazioni ottenute con l'evento [`locationfound`](https://leafletjs.com/reference.html#map-locationfound) possiamo aggiungere alla mappa un [`Marker`](https://leafletjs.com/reference.html#marker) (con un popup testuale) e un [`Circle`](https://leafletjs.com/reference.html#circle) nella posizione in cui è stato localizzato l'utente.

    ```js
    function locate() {
        map.on("locationfound", function (evt) {
            var latlng = evt.latlng;
            var radius = evt.accuracy;

            // marker
            var marker = L.marker(latlng).addTo(map);

            // popup
            marker.bindPopup("Ti trovi in un raggio di <b>" + radius + "</b> metri da questo punto");

            // circle
            L.circle(latlng, {
                color: "red",
                radius: radius
            }).addTo(map);
        });

        map.locate({setView: true, maxZoom: 16});
    }
    ```


# Aggiungere layer vettoriali
A una mappa possiamo aggiungere layer vettoriali. Il formato nativo supportato da Leaflet per i dati vettoriali è `GeoJSON`.

`GeoJSON` è un semplice formato per poter codificare entità spaziali (ad esempio, geometrie), chiamate _features_, in formato JSON. Di seguito, un esempio di documeto GeoJSON

```json
{
  "type":"FeatureCollection",
  "name":"comuni",
  "crs":{
    "type":"name",
    "properties":{
      "name":"urn:ogc:def:crs:EPSG::32632"
    }
  },
  "features":[
    {
      "type":"Feature",
      "properties":{
        "ISTAT":"15065056",
        "NOME":"GIFFONI VALLE PIANA",
        "NOME_PROV":"SALERNO",
        "REG":15,
        "PRO":65,
        "COM":56,
        "ANNO":"1991",
        "SHAPE_area":0.00939782645,
        "SHAPE_len":0.65301268598,
        "Area":8814.129
      },
      "geometry":{
        "type":"MultiPolygon",
        "coordinates":[
          [
            [
              [
                996042.2585139533,
                4518896.288832014
              ],
              [
                996035.5689861259,
                4519009.801137018
              ],
              [
                996041.0649546725,
                4519047.30053483
              ]
            ]
          ]
        ]
      }
    }
  ]
}
```

Quindi, se abbiamo dati vettoriali in altri formati, come _shapefile_, è necessario prima convertirli in formato GeoJSON, ad esempio con QGIS.

Inoltre, poiché Leaflet è una libreria web, non è possibile accedere ai dati memorizzati sul filesystem del nostro computer. I dati vettoriali devono essere pubblicati online ad un certo indirizzo (ad esempio, possono essere pubblicati dal nostro web server). Successivamente, in uno script JavaScript si "copiano" i dati del file vettoriale in una variabile che poi passeremo alla libreria Leaflet.

Proviamo ad aggiungere alla mappa un layer vettoriale, pubblicato all'indirizzo

```
http://localhost:8080/leaflet-test-1.0-SNAPSHOT/geo/comuni_igp.geojson
```

1. Aggiungiamo un pulsante "Carica Layer" alla nostra pagina html, che al click esegui una funzione `loadVector()`

    ```html
    <button type="button" onclick="loadVector()">Carica Layer</button>
    ```

2. Aggiungiamo la funzione `loadVector()` al nostro script

    ```js
    function loadVector() {
        const url = "http://localhost:8080/leaflet-test-1.0-SNAPSHOT/geo/comuni_igp.geojson";
    }
    ```

3. Con la funzione `getJSON` di jQuery, otteniamo i dati vettoriali in una variabile `geojsonData`

    ```js
    function loadVector() {
        const url = "http://localhost:8080/leaflet-test-1.0-SNAPSHOT/geo/comuni_igp.geojson";
        
        $.getJSON(url, function (geojsonData) {
 
        });
    }

    ```

   > 💡 La libreria jQuery deve essere inclusa nella pagina web

4. Aggiungiamo un layer vettoriale alla mappa

   Costruiamo un layer di tipo [`GeoJSON`](https://leafletjs.com/reference.html#geojson) con la funzione [`L.geoJSON(data, options)`](https://leafletjs.com/reference.html#geojson-l-geojson) a cui, come parametro, passiamo i dati vettoriali

    ```js
    function loadVector() {
        const url = "http://localhost:8080/leaflet-test-1.0-SNAPSHOT/geo/comuni_igp.geojson";
        
        $.getJSON(url, function (geojsonData) {
            let layerComuni = L.geoJson(geojsonData).addTo(map);
        
        });
    }

    ```

5. Spostiamo la visualizzazione sul nuovo layer

   Su un layer possiamo ottenere il suo _Bounding Box_ (o _Boundary_) mediante la funzione [`getBounds()`](https://leafletjs.com/reference.html#map-getbounds). Successivamente, con la funzione [`map.fitBounds(bounds)`](https://leafletjs.com/reference.html#map-fitbounds) possiamo centrare la visualizzazione sul nuovo layer.

    ```js
    $.getJSON(url, function (geojsonData) {
        let layerComuni = L.geoJson(geojsonData).addTo(map);

        map.fitBounds(layerComuni.getBounds());
    });
    ```

   In questo modo, all'aggiunta del nuovo layer, la visualizzazione verrà spostata e allargata in modo che tutto il nuovo layer entri nell'inquadratura

6. Aggiungiamo le opzioni di creazione

   Alla creazione di un layer [`GeoJSON`](https://leafletjs.com/reference.html#geojson) possiamo passare, come ultimo parametro della funzione [`L.geoJSON(data, options)`](https://leafletjs.com/reference.html#geojson-l-geojson) un oggetto JSON con varie opzioni. Di seguito vediamo le più importanti

    - [`filter`](https://leafletjs.com/reference.html#geojson-filter): filtriamo solo le aree maggiori di 2000

      L'opzione [`filter`](https://leafletjs.com/reference.html#geojson-filter) può essere usata per controllare la visibilità delle features GeoJSON. A tale scopo, si passa una funzione come opzione. Questa funzione viene richiamata per ogni feature (geometria) presente nel file GeoJSON. Possiamo quindi utilizzare i valori delle proprietà della feature per controllare la sua visibilità, restituendo `true` o `false`.

        ```js
         let layerComuni = L.geoJson(geojsonData, {
             filter: function (feature) {
                 return feature.properties.Area > 2000;
             }
         }).addTo(map);
        ```

    - [`style`](https://leafletjs.com/reference.html#geojson-style): coloriamo di rosso le aree maggiori di 3000

      L'opzione [`style`](https://leafletjs.com/reference.html#geojson-style) può essere usata per definire lo stile delle geometrie. La definizione può avvenire in due modi diversi:

        - si può passare un semplice oggetto JSON che applica lo stesso stile tutte le geometrie

            ```js
            let layerComuni = L.geoJson(geojsonData, {
                style: {
                    "color": "#ff7800",
                    "weight": 5,
                    "opacity": 0.65
                }
            }).addTo(map);
            ```

        - possiamo passare una funzione che applica lo stile alle singole geometrie in base alle loro proprietà. Nell'esempio che segue, controlliamo la proprietà `Area` e restituiamo un oggetto di stile che verrà applicato solo agli elementi che soddisfano la condizione espressa nell'`if`

            ```js
            let layerComuni = L.geoJson(geojsonData, {
                style: function (feature) {
                    if (feature.properties.Area > 3000) {
                        return {color: "red"}
                    }
                }
            }).addTo(map);
            ```

      > 💡 Lo stile può essere modificato anche successivamente utilizzando la funzione [`layer.setStyle(style)`](https://leafletjs.com/reference.html#geojson-setstyle)


- [`onEachFeature`](https://leafletjs.com/reference.html#geojson-oneachfeature): aggiungiamo un popup

  L'opzione [`onEachFeature`](https://leafletjs.com/reference.html#geojson-oneachfeature) è una funzione che viene eseguita, per ogni feature, prima che questa venga aggiunta alla mappa. Un utilizzo comune per questa opzione è quella di aggiungere un popup agli oggetti quando vengono cliccati. Infatti a tale funzione, oltre alla geometria, viene passato anche l'oggetto Leaflet (`layer`) che rappresenta la geometria sulla mappa

    ```js
     let layerComuni = L.geoJson(geojsonData, {
         onEachFeature: function (feature, layer) {
             layer.bindPopup(popupString(feature));
         }
     }).addTo(map);
    ```

  > 💡 La funzione `popupString(feature)` prende in input la geometria e restituisce in output una stringa html con alcune informazioni su di essa
  > ```js
        > function popupString(feature) {
        >   let str = "<b>" + feature.properties.NOME + "</b>"
        >            + "<br><br><b>Provincia</b>: " + feature.properties.NOME_PROV
        >            + "<br><b>Codice ISTAT</b>: " + feature.properties.ISTAT
        >            + "<br><b>Area</b>: " + feature.properties.Area;
        >
        >    return str;
        > }
        > ```

7.  Aggiungiamo un po' di interattività al passaggio del mouse

    Un altro utilizzo comune dell'opzione [`onEachFeature`](https://leafletjs.com/reference.html#geojson-oneachfeature) e quella di aggiungere degli eventi sugli elementi del layer GeoJSON.

    Infatti, poiché con tale opzione viene passato anche l'oggetto Leaflet (`layer`) che rappresenta la geometria sulla mappa, possiamo catturare gli eventi che vengono generati quando l'utente interagisce con il layer.

    Ad esempio, possiamo catturare gli eventi `mouseover` e `mouseout` che vengono generati quando il mouse passa su una geometria, per cambiare il suo stile e popolare un box di informazioni


    - Aggiungiamo un div `#infobox` alla nostra pagina html

        ```html
        <div id="infobox"></div>
        ```
    
    - Catturiamo i due eventi con l'opzione [`onEachFeature`](https://leafletjs.com/reference.html#geojson-oneachfeature)

        ```js
        let layerComuni = L.geoJson(geojsonData, {
            onEachFeature: function (feature, layer) {

                layer.on("mouseover", function(evt) {
                    layer.setStyle({
                        weight: 5,
                        color: "white"
                    });

                    layer.bringToFront();

                    $("#infobox").append(popupString(feature));
                });

                layer.on("mouseout", function () {
                    layerComuni.resetStyle(layer);
                    $("#infobox").empty();
                });

            }
        }).addTo(map);
        ```

8.  Aggiungiamo un pulsante "Rimuovi layer"

    ```html
    <button type="button" onclick="removeLayer()">Rimuovi Layer</button>
    ```

    ```js
    function removeLayer() {
        map.removeLayer(layerComuni);
    }
    ```

9.  Aggiungiamo una ricerca "grezza"

    Leaflet elabora un layer [`GeoJSON`](https://leafletjs.com/reference.html#geojson) come un insieme di layers. Per ogni feature (geometria) presente all'interno del file GeoJSON, viene creato un layer differente. Infine, tutti questi layers vengono raggruppati in un unico layer di tipo [`LayerGroup`](https://leafletjs.com/reference.html#layergroup).

    Tra le funzioni disponibili per un [`LayerGroup`](https://leafletjs.com/reference.html#layergroup) vi è la funzione [`getLayers()`](https://leafletjs.com/reference.html#layergroup-getlayer) che ci permette di ottenere una lista di tutti i layers di cui è composto.

    Possiamo utilizzare tale funzione per implementare una semplice funzione di ricerca.

    - Aggiungiamo alla pagina html un input box e un tasto di ricerca

        ```html
        <input type="text" id="search-input" placeholder="Inserisci un nome">
        <button type="button" onclick="search()">Cerca</button>
        ```


    - Implementiamo la funzione di ricerca
    
        La funzione itera su tutti i layers di cui è composto il nostro layer `layerComuni`, ovvero i layers dei singoli comuni. Quando trova un layer la cui proprietà `NOME` corrisponde alla query dell'utente, ferma la ricerca e sposta la mappa sul comune trovato.

        ```js
        function search() {
            const searchQuery = $("#search-input").val().toUpperCase();

            const layers = layerComuni.getLayers();

            // = for (let i = 0; i < layers.length; i++) { const layerComune = layers[i] }
            for (const layerComune of layers) { 
                if (layerComune.feature.properties.NOME.toUpperCase() === searchQuery) {
                    map.fitBounds(layerComune.getBounds());
                    break;
                }
            }
        }
        ```
