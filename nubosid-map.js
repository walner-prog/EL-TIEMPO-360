// Inicializar el mapa en el contenedor específico con opciones personalizadas
var map = L.map('map-container-temperatura', {
    center: [12.8654, -85.2072], // Coordenadas del centro del mapa (Nicaragua)
    zoom: 8, // Nivel de zoom por defecto
    minZoom: 4, // Nivel de zoom mínimo
    maxZoom: 19, // Nivel de zoom máximo
    zoomControl: true, // Mostrar controles de zoom
    scrollWheelZoom: false, // Deshabilitar el zoom con la rueda del mouse
    doubleClickZoom: true, // Deshabilitar el zoom con doble clic
    dragging: true, // Deshabilitar el arrastre del mapa
    touchZoom: false // Deshabilitar el zoom táctil
  });

  // Agregar capa base de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Coordenadas de las ciudades de Nicaragua
  var cities = {
    "Managua": {lat: 12.13282, lon: -86.250397},
    "Boaco": {lat: 12.47224, lon: -85.6586},
    "Granada": {lat: 11.92988, lon: -85.956017},
    "Chinandega": {lat: 12.62937, lon: -87.13105},
    "Juigalpa": {lat: 12.10629, lon: -85.364517},
    "Esteli": {lat: 13.09185, lon: -86.353844},
    "San Marcos": {lat: 11.90949, lon: -86.203506},
    "Jinotega": {lat: 13.09171, lon: -86.00177},
    "Nagarote": {lat: 12.43787, lon: -86.87803},
    "Masaya": {lat: 11.97444, lon: -86.09417},
    "Matagalpa": {lat: 12.92559, lon: -85.917473},
    "Ocotal": {lat: 13.63208, lon: -86.475159},
    "Rivas": {lat: 11.43716, lon: -85.826317},
    "Bluefields": {lat: 12.01366, lon: -83.763527},
    "Puerto Cabezas": {lat: 14.03507, lon: -83.388817}
  };

  // API Key de OpenWeatherMap
  var apiKey_tem = '3c743983734341f81c2486dcce043049';

  // Función para obtener la temperatura y agregar marcadores en el mapa
  function getTemperatureAndAddMarker(city, coords) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey_tem}`)
      .then(response => response.json())
      .then(data => {
        var temperature = data.main.temp;
        var velocidadViento = data.wind.speed;
        var probPrecipitacion = data.weather[0].description;

         // Traducir el valor de probPrecipitacion a español si es necesario
if (probPrecipitacion === 'clear sky') {
  probPrecipitacion = 'Cielo despejado';
} else if (probPrecipitacion === 'few clouds') {
  probPrecipitacion = 'Pocas nubes';
} else if (probPrecipitacion === 'scattered clouds') {
  probPrecipitacion = 'Nubes dispersas';
} else if (probPrecipitacion === 'broken clouds') {
  probPrecipitacion = 'Nublado parcialmente';
} else if (probPrecipitacion === 'overcast clouds') {
  probPrecipitacion = 'Nublado';
} else if (probPrecipitacion === 'mist') {
  probPrecipitacion = 'Neblina';
} else if (probPrecipitacion === 'fog') {
  probPrecipitacion = 'Niebla';
} else if (probPrecipitacion === 'light rain') {
  probPrecipitacion = 'Lluvia ligera';
} else if (probPrecipitacion === 'moderate rain') {
  probPrecipitacion = 'Lluvia moderada';
} else if (probPrecipitacion === 'heavy intensity rain') {
  probPrecipitacion = 'Lluvia intensa';
} else if (probPrecipitacion === 'very heavy rain') {
  probPrecipitacion = 'Lluvia muy intensa';
} else if (probPrecipitacion === 'extreme rain') {
  probPrecipitacion = 'Lluvia extrema';
} else if (probPrecipitacion === 'freezing rain') {
  probPrecipitacion = 'Lluvia helada';
} else if (probPrecipitacion === 'light snow') {
  probPrecipitacion = 'Nieve ligera';
} else if (probPrecipitacion === 'snow') {
  probPrecipitacion = 'Nieve';
} else if (probPrecipitacion === 'heavy snow') {
  probPrecipitacion = 'Nieve intensa';
} else if (probPrecipitacion === 'sleet') {
  probPrecipitacion = 'Aguanieve';
} else if (probPrecipitacion === 'shower rain') {
  probPrecipitacion = 'Lluvia con chubascos';
} else if (probPrecipitacion === 'light intensity shower rain') {
  probPrecipitacion = 'Chubascos de lluvia ligera';
} else if (probPrecipitacion === 'shower snow') {
  probPrecipitacion = 'Chubascos de nieve';
} else if (probPrecipitacion === 'light rain and snow') {
  probPrecipitacion = 'Lluvia y nieve ligera';
} else if (probPrecipitacion === 'rain and snow') {
  probPrecipitacion = 'Lluvia y nieve';
} else if (probPrecipitacion === 'light shower snow') {
  probPrecipitacion = 'Chubascos de nieve ligera';
} else if (probPrecipitacion === 'shower sleet') {
  probPrecipitacion = 'Aguanieve con chubascos';
} else if (probPrecipitacion === 'thunderstorm with light rain') {
  probPrecipitacion = 'Tormenta eléctrica con lluvia ligera';
} else if (probPrecipitacion === 'thunderstorm with rain') {
  probPrecipitacion = 'Tormenta eléctrica con lluvia';
} else if (probPrecipitacion === 'thunderstorm with heavy rain') {
  probPrecipitacion = 'Tormenta eléctrica con lluvia intensa';
} else if (probPrecipitacion === 'light thunderstorm') {
  probPrecipitacion = 'Tormenta eléctrica ligera';
} else if (probPrecipitacion === 'thunderstorm') {
  probPrecipitacion = 'Tormenta eléctrica';
} else if (probPrecipitacion === 'heavy thunderstorm') {
  probPrecipitacion = 'Tormenta eléctrica intensa';
} else if (probPrecipitacion === 'ragged thunderstorm') {
  probPrecipitacion = 'Tormenta eléctrica irregular';
} else if (probPrecipitacion === 'thunderstorm with light drizzle') {
  probPrecipitacion = 'Tormenta eléctrica con llovizna ligera';
} else if (probPrecipitacion === 'thunderstorm with drizzle') {
  probPrecipitacion = 'Tormenta eléctrica con llovizna';
} else if (probPrecipitacion === 'thunderstorm with heavy drizzle') {
  probPrecipitacion = 'Tormenta eléctrica con llovizna intensa';
} else {
  // Devolver la descripción original si no se encuentra una traducción
  return probPrecipitacion;
}

        var marker = L.marker([coords.lat, coords.lon]).addTo(map)
          .bindPopup(`<b>${city}</b><br>Temperatura: ${temperature} °C <br>velocidadViento: ${velocidadViento} km/h <br>probPrecipitacion: ${probPrecipitacion}`);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }

  // Obtener temperaturas y agregar marcadores para cada ciudad
  for (var city in cities) {
    getTemperatureAndAddMarker(city, cities[city]);
  }

  // Agregar leyenda de escala de temperatura
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    var grades = [-40, -20, 0, 20, 40]; // Valores de temperatura típicos en °C
    var colors = [
      "#FFEAA4",
      "#FEC18F",
      "#F1B87C",
      "#fb9f3a",
      "#ed7953"
    ];

    div.innerHTML = '<strong>Temperatura (°C)</strong><br>';
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + colors[i] + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
  };

  legend.addTo(map);