"use strict";

// Inicializar el mapa en el contenedor específico con opciones personalizadas
var map = L.map('map-container', {
  center: [12.8654, -85.2072],
  // Coordenadas del centro del mapa (Nicaragua)
  zoom: 7,
  // Nivel de zoom por defecto
  minZoom: 2,
  // Nivel de zoom mínimo
  maxZoom: 19,
  // Nivel de zoom máximo
  zoomControl: true,
  // Mostrar controles de zoom
  scrollWheelZoom: false,
  // Deshabilitar el zoom con la rueda del mouse
  doubleClickZoom: true,
  // Deshabilitar el zoom con doble clic
  dragging: true,
  // Deshabilitar el arrastre del mapa
  touchZoom: false // Deshabilitar el zoom táctil

}); // Agregar capa base de OpenStreetMap

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); // Agregar capa de precipitaciones de OpenWeatherMap

var precipitationLayer = L.tileLayer("https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=TU_API_KEY", {
  maxZoom: 19,
  attribution: 'Map data &copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
}).addTo(map); // Agregar leyenda de escala de precipitaciones

var legend = L.control({
  position: 'bottomright'
});

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'legend');
  var precipitations = [0, 5, 10, 20, 50, 100]; // Cantidades de precipitaciones en mm

  var colors = ["#FFFFFF", "#E0F3F8", "#B2E2E2", "#66C2A4", "#2CA25F", "#006D2C"];
  div.innerHTML = '<strong>Precipitaciones (mm)</strong><br>';

  for (var i = 0; i < precipitations.length; i++) {
    div.innerHTML += '<i style="background:' + colors[i] + '"></i> ' + precipitations[i] + (precipitations[i + 1] ? '&ndash;' + precipitations[i + 1] + '<br>' : '+');
  }

  return div;
};

legend.addTo(map);