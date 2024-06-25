
  // Inicializar el mapa en el centro del mundo
  var map = L.map('map').setView([0, 0], 2);

  // Agregar capa base de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Coordenadas y nombres de los departamentos de Nicaragua
  var departamentosNicaragua = [
    { nombre: 'Boaco', latitud: 12.467, longitud: -85.666 },
    { nombre: 'Carazo', latitud: 11.832, longitud: -86.228 },
    { nombre: 'Chinandega', latitud: 12.630, longitud: -87.131 },
    { nombre: 'Chontales', latitud: 12.006, longitud: -85.361 },
    { nombre: 'Estelí', latitud: 13.091, longitud: -86.356 },
    { nombre: 'Granada', latitud: 11.927, longitud: -85.956 },
    { nombre: 'Jinotega', latitud: 13.091, longitud: -86.009 },
    { nombre: 'León', latitud: 12.509, longitud: -86.719 },
    { nombre: 'Madriz', latitud: 13.494, longitud: -86.152 },
    { nombre: 'Managua', latitud: 12.147, longitud: -86.273 },
    { nombre: 'Masaya', latitud: 11.974, longitud: -86.094 },
    { nombre: 'Matagalpa', latitud: 12.927, longitud: -85.917 },
    { nombre: 'Nueva Segovia', latitud: 13.632, longitud: -86.476 },
    { nombre: 'Río San Juan', latitud: 11.250, longitud: -84.770 },
    { nombre: 'Rivas', latitud: 11.424, longitud: -85.828 },
    // Agrega más departamentos si es necesario
  ];

  // Coordenadas y nombres de las provincias de Argentina
  var provinciasArgentina = [
    { nombre: 'Buenos Aires', latitud: -34.6037, longitud: -58.3816 },
    { nombre: 'Córdoba', latitud: -31.4201, longitud: -64.1888 },
    { nombre: 'Santa Fe', latitud: -31.6333, longitud: -60.7000 },
    { nombre: 'Mendoza', latitud: -32.8895, longitud: -68.8458 },
    { nombre: 'Tucumán', latitud: -26.8083, longitud: -65.2176 },
    { nombre: 'Entre Ríos', latitud: -32.1686, longitud: -59.0330 },
    { nombre: 'Salta', latitud: -24.7859, longitud: -65.4117 },
    { nombre: 'Misiones', latitud: -27.3621, longitud: -55.9000 },
    { nombre: 'Chaco', latitud: -27.4500, longitud: -58.9833 },
    { nombre: 'Corrientes', latitud: -27.4806, longitud: -58.8341 },
    { nombre: 'Santiago del Estero', latitud: -27.7834, longitud: -64.2642 },
    { nombre: 'San Juan', latitud: -31.5375, longitud: -68.5364 },
    { nombre: 'Jujuy', latitud: -24.1858, longitud: -65.2995 },
    { nombre: 'Río Negro', latitud: -41.1334, longitud: -71.3103 },
    { nombre: 'Formosa', latitud: -26.1865, longitud: -58.1735 },
    { nombre: 'San Luis', latitud: -33.2994, longitud: -66.3356 },
    { nombre: 'Catamarca', latitud: -28.4696, longitud: -65.7852 },
    { nombre: 'La Rioja', latitud: -29.4131, longitud: -66.8557 },
    { nombre: 'La Pampa', latitud: -36.6167, longitud: -64.2833 },
    { nombre: 'Chubut', latitud: -43.3000, longitud: -65.1000 },
    { nombre: 'Neuquén', latitud: -38.9516, longitud: -68.0591 },
    { nombre: 'Formosa', latitud: -24.1869, longitud: -65.2995 },
    { nombre: 'Santa Cruz', latitud: -51.6226, longitud: -69.2181 },
    { nombre: 'Tierra del Fuego', latitud: -54.8000, longitud: -68.3000 },
    // Agrega más provincias si es necesario
  ];

  // Coordenadas y nombres de los estados de Brasil
  var estadosBrasil = [
    { nombre: 'Acre', latitud: -9.0479, longitud: -70.5265 },
    { nombre: 'Alagoas', latitud: -9.6612, longitud: -36.6502 },
    { nombre: 'Amapá', latitud: 0.0349, longitud: -51.0665 },
    { nombre: 'Amazonas', latitud: -3.4168, longitud: -65.8561 },
    { nombre: 'Bahía', latitud: -12.9714, longitud: -38.5014 },
    { nombre: 'Ceará', latitud: -3.7172, longitud: -38.5431 },
    { nombre: 'Espírito Santo', latitud: -20.3155, longitud: -40.3128 },
    { nombre: 'Goiás', latitud: -15.8270, longitud: -49.8363 },
    { nombre: 'Maranhão', latitud: -4.9609, longitud: -45.2744 },
    { nombre: 'Mato Grosso', latitud: -15.5989, longitud: -56.0949 },
    { nombre: 'Mato Grosso do Sul', latitud: -20.4428, longitud: -54.6466 },
    { nombre: 'Minas Gerais', latitud: -18.5122, longitud: -44.5550 },
    { nombre: 'Pará', latitud: -1.4550, longitud: -48.5044 },
    { nombre: 'Paraíba', latitud: -7.1195, longitud: -36.8790 },
    { nombre: 'Paraná', latitud: -25.2521, longitud: -52.0215 },
    { nombre: 'Pernambuco', latitud: -8.0476, longitud: -34.8770 },
    { nombre: 'Piauí', latitud: -6.6029, longitud: -42.2939 },
    { nombre: 'Rio de Janeiro', latitud: -22.9068, longitud: -43.1729 },
    { nombre: 'Rio Grande do Norte', latitud: -5.7945, longitud: -36.9541 },
    { nombre: 'Rio Grande do Sul', latitud: -30.0346, longitud: -51.2177 },
    { nombre: 'Rondônia', latitud: -10.9431, longitud: -62.8275 },
    { nombre: 'Roraima', latitud: 2.8194, longitud: -60.6714 },
    { nombre: 'Santa Catarina', latitud: -27.5954, longitud: -48.5480 },
    { nombre: 'São Paulo', latitud: -23.5505, longitud: -46.6333 },
    { nombre: 'Sergipe', latitud: -10.9472, longitud: -37.0731 },
    { nombre: 'Tocantins', latitud: -10.1753, longitud: -48.2982 },
    // Agrega más estados si es necesario
  ];

  // Coordenadas y nombres de las provincias de Canadá
  var provinciasCanada = [
    { nombre: 'Alberta', latitud: 53.9333, longitud: -116.5765 },
    { nombre: 'British Columbia', latitud: 53.7267, longitud: -127.6476 },
    { nombre: 'Manitoba', latitud: 55.0000, longitud: -97.0000 },
    { nombre: 'New Brunswick', latitud: 46.5653, longitud: -66.4619 },
    { nombre: 'Newfoundland and Labrador', latitud: 53.1355, longitud: -57.6604 },
    { nombre: 'Nova Scotia', latitud: 44.6819, longitud: -63.7443 },
    { nombre: 'Ontario', latitud: 51.2538, longitud: -85.3232 },
    { nombre: 'Prince Edward Island', latitud: 46.5107, longitud: -63.4168 },
    { nombre: 'Quebec', latitud: 52.9399, longitud: -73.5491 },
    { nombre: 'Saskatchewan', latitud: 52.9399, longitud: -106.4509 },
    { nombre: 'Northwest Territories', latitud: 64.8255, longitud: -124.8457 },
    { nombre: 'Nunavut', latitud: 70.2998, longitud: -83.1076 },
    { nombre: 'Yukon', latitud: 64.2823, longitud: -135.0000 }
    // Agrega más provincias si es necesario
  ];

  // Coordenadas y nombres de las regiones de Chile
  var regionesChile = [
    { nombre: 'Arica y Parinacota', latitud: -18.5000, longitud: -69.9000 },
    { nombre: 'Tarapacá', latitud: -20.2000, longitud: -69.3167 },
    { nombre: 'Antofagasta', latitud: -23.6500, longitud: -70.4000 },
    { nombre: 'Atacama', latitud: -27.3660, longitud: -70.3320 },
    { nombre: 'Coquimbo', latitud: -29.9533, longitud: -71.3393 },
    { nombre: 'Valparaíso', latitud: -33.0458, longitud: -71.6197 },
    { nombre: 'Metropolitana de Santiago', latitud: -33.4727, longitud: -70.6472 },
    { nombre: 'Libertador General Bernardo O\'Higgins', latitud: -34.4064, longitud: -71.2870 },
    { nombre: 'Maule', latitud: -35.5192, longitud: -71.4067 },
    { nombre: 'Ñuble', latitud: -36.7226, longitud: -71.7622 },
    { nombre: 'Biobío', latitud: -37.3730, longitud: -72.2776 },
    { nombre: 'La Araucanía', latitud: -38.7404, longitud: -72.5904 },
    { nombre: 'Los Ríos', latitud: -40.2330, longitud: -72.9830 },
    { nombre: 'Los Lagos', latitud: -41.7447, longitud: -73.1147 },
    { nombre: 'Aysén del General Carlos Ibáñez del Campo', latitud: -45.5667, longitud: -72.0667 },
    { nombre: 'Magallanes y de la Antártica Chilena', latitud: -53.1500, longitud: -70.9167 }
    // Agrega más regiones si es necesario
  ];

  // Función para obtener datos meteorológicos para un país y mostrarlos en el mapa
  function obtenerDatosMeteorologicos(pais) {
    var latitudCentro;
    var longitudCentro;
    var departamentos;

    switch (pais) {
      case 'Nicaragua':
        latitudCentro = 12.865416;
        longitudCentro = -85.207229;
        departamentos = departamentosNicaragua;
        break;
      case 'Argentina':
        latitudCentro = -38.4161;
        longitudCentro = -63.6167;
        departamentos = provinciasArgentina;
        break;
      case 'Brazil':
        latitudCentro = -14.2350;
        longitudCentro = -51.9253;
        departamentos = estadosBrasil;
        break;
      case 'Canada':
        latitudCentro = 56.1304;
        longitudCentro = -106.3468;
        departamentos = provinciasCanada;
        break;
      case 'Chile':
        latitudCentro = -35.6751;
        longitudCentro = -71.5430;
        departamentos = regionesChile;
        break;
      // Agrega más casos para otros países si es necesario
      default:
        latitudCentro = 0;
        longitudCentro = 0;
        departamentos = [];
        break;
    }

    map.setView([latitudCentro, longitudCentro], 4);

    // Iterar sobre los departamentos y obtener los datos meteorológicos
    departamentos.forEach(departamento => {
      obtenerDatosDepartamento(pais, departamento);
    });
  }

  // Función para obtener los datos meteorológicos para un departamento específico
  function obtenerDatosDepartamento(pais, departamento) {
    // Hacer una solicitud a la API de OpenWeatherMap
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + departamento.latitud + '&lon=' + departamento.longitud + '&appid=3c743983734341f81c2486dcce043049&units=metric';

    fetch(url)
     
    .then(response => response.json())
      .then(data => {
        var temperatura = data.main.temp;
        var velocidadViento = data.wind.speed;
        var probPrecipitacion = data.weather[0].description;

        // Agregar marcador con los datos meteorológicos como etiqueta
        L.marker([departamento.latitud, departamento.longitud]).addTo(map)
          .bindPopup(`Departamento: ${departamento.nombre}<br>Temperatura: ${temperatura}°C<br>Viento: ${velocidadViento} km/h<br>Prob. de precipitaciones: ${probPrecipitacion}`)
          .openPopup();
      })
      .catch(error => {
        console.error('Error al obtener datos meteorológicos:', error);
      });
  }

  // Obtener datos meteorológicos para Nicaragua por defecto al cargar la página
  obtenerDatosMeteorologicos('Nicaragua');

  // Manejar el cambio en la selección de país
  document.getElementById('pais-select').addEventListener('change', function() {
    var paisSeleccionado = this.value;
    limpiarMapa();
    obtenerDatosMeteorologicos(paisSeleccionado);
  });

  // Función para limpiar el mapa de marcadores
  function limpiarMapa() {
    map.eachLayer(function(layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  }
