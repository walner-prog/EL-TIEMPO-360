function recomendarActividad(data) {
    var temperatura = data.main.temp;
    var probabilidadLluvia = data.clouds.all ? data.clouds.all : 0; 
    var velocidadViento = data.wind.speed * 3.6;
    var umedad = data.main.humidity;

    var actividadesSeca = document.getElementById('actividades-seca');
    var actividadesLluvia = document.getElementById('actividades-lluvia');

    actividadesSeca.innerHTML = '';
    actividadesLluvia.innerHTML = '';

    // Ejemplos de umbrales para las recomendaciones (puedes ajustar según tus criterios)
    var umbralTemperaturaAlta = 32;
    var umbralProbabilidadLluvia = 55;
    var umbralVelocidadVientoAlta = 25;
    var umbralUmedadAlta = 80;

    console.log(data);
    if (temperatura <= umbralTemperaturaAlta && umedad <= umbralUmedadAlta &&  probabilidadLluvia <= umbralProbabilidadLluvia && velocidadViento <= umbralVelocidadVientoAlta) {
      // Actividades recomendadas para temporada seca
      var actividadesSecaHTML = `
        <ul class="list-group alert alert-success">
                      
          <li class="list-group-item">
            <strong>Senderismo y Excursionismo</strong><br>
            <span class="text-muted">Condiciones ideales para explorar los volcanes y reservas naturales.</span>

          </li>
          <li class="list-group-item">
            <strong>Surf y Deportes Acuáticos</strong><br>
            <span class="text-muted">Olas moderadas y clima cálido en San Juan del Sur.</span>
          </li>
          <li class="list-group-item">Temperatura Actual: ${temperatura} °C</li>
                      <li class="list-group-item">Probabilidad de Lluvia: ${probabilidadLluvia} %</li>
                      <li class="list-group-item">Velocidad del Viento: ${velocidadViento.toFixed(2)} km/h</li>
                        <li class="list-group-item">Umedad Actual: ${umedad} °%</li>
        </ul>
      `;
      actividadesSeca.innerHTML = actividadesSecaHTML;

      // Actividades recomendadas para temporada de lluvias
      var actividadesLluviaHTML = `
        <ul class="list-group alert alert-success">
         
          <li class="list-group-item">
            <strong>Visita a Reservas Naturales</strong><br>
            <span class="text-muted">Actividad adecuada para observar la flora y fauna bajo la lluvia.</span>
          </li>
          <li class="list-group-item">
            <strong>Visita a Cascadas y Ríos</strong><br>
            <span class="text-muted">Caudal aumentado por las lluvias, ideal para paisajes naturales.</span>
          </li>
        </ul>
      `;
      actividadesLluvia.innerHTML = actividadesLluviaHTML;
    } else {
      // Condiciones climáticas no adecuadas para actividades al aire libre
      var recomendacionHTML = `
        <div class="alert alert-warning" role="alert">
          <h3>Actividades Recomendadas Temporada de verano e invierno</h3>
          <strong>Precaución:</strong> Las condiciones climáticas actuales no son ideales para actividades al aire libre en esta ciudad.
                      <li class="list-group-item">Temperatura Actual: ${temperatura} °C</li>
                      <li class="list-group-item">Probabilidad de Lluvia: ${probabilidadLluvia} %</li>
                      <li class="list-group-item">Velocidad del Viento: ${velocidadViento.toFixed(2)} km/h</li>
                        <li class="list-group-item">Umedad Actual: ${umedad} °%</li>
        </div>
      `;
      actividadesSeca.innerHTML = recomendacionHTML;
      actividadesLluvia.innerHTML = recomendacionHTML;
    }
  }

    // Manejar el envío del formulario para consultar el clima
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

      var ciudad = document.getElementById('ciudadSelect').value;
      var ciudadesCoordenadas = {
        "Managua": {lat:  12.13282, lon: -86.250397},
        "Boaco": {lat: 12.47224, lon: -85.6586},
        "Granada": {lat:  11.92988, lon: -85.956017},
        "Chinandega": {lat: 12.62937, lon: -87.13105},
        "Juigalpa": {lat: 12.10629, lon: -85.364517},
        "Esteli": {lat: 13.09185, lon: -86.353844},
        "San Marcos": {lat: 11.90949, lon: -86.203506},
        "Jinotega": {lat:  13.09171, lon: -86.00177},
        "Nagarote": {lat:  12.43787, lon: -86.87803},
        "Masaya": {lat:  11.97444, lon: -86.09417},
        "Matagalpa": {lat: 12.92559, lon:  -85.917473},
        "Ocotal": {lat: 13.63208, lon: -86.475159},
        "Rivas": {lat:  11.43716, lon: -85.826317},
        "Bluefields": {lat: 12.01366, lon: -83.763527},
        "Puerto Cabezas": {lat: 14.03507, lon: -83.388817}
      };
      
      var apiKey = '3c743983734341f81c2486dcce043049'; // Reemplaza con tu propia API Key de OpenWeatherMap
      var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${ciudadesCoordenadas[ciudad].lat}&lon=${ciudadesCoordenadas[ciudad].lon}&units=metric&appid=${apiKey}`;

      fetch(apiUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          recomendarActividad(data);
        })
        .catch(function(error) {
          console.log('Error al obtener datos:', error);
          // Manejar errores en la obtención de datos
          var errorHTML = `
            <div class="alert alert-danger" role="alert">
              <strong>Error:</strong> No se pudo obtener los datos meteorológicos en este momento.
            </div>
          `;
          document.getElementById('actividades-seca').innerHTML = errorHTML;
          document.getElementById('actividades-lluvia').innerHTML = errorHTML;
        });
    });