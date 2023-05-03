<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Leaflet tutorial</title>
    <link rel="stylesheet" href="css/index.css">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
</head>
<body>
<div class="container">
    <div id="map"></div>
    <div class="control">
        <button type="button" onclick="locate()">Localizza</button>
        <button type="button" onclick="loadVector()">Carica Vettoriale</button>
        <input type="text" id="query">
        <button type="button" onclick="search()">Cerca</button>
        <button type="button" onclick="loadRaster()">Carica Raster</button>
        <div id="infobox">

        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.4.js" integrity="sha256-a9jBBRygX1Bh5lt8GZjXDzyOB+bWve9EiO7tROUtj/E=" crossorigin="anonymous"></script>
<script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>
<script type="application/javascript" src="js/index.js"></script>
</body>
</html>