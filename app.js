// API key y ciudad predeterminada
const apiKey = '3c743983734341f81c2486dcce043049';
const defaultCity = 'Managua';

// URLs para obtener datos del clima
const apiUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`;
const extendedApiUrl = (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=es&units=metric`;

// Iconos de clima
const weatherIcons = {
    'Clear': 'fa-sun text-warning',
    'Clouds': 'fa-cloud text-white',
    'Rain': 'fa-cloud-showers-heavy text-white',
    'Drizzle': 'fa-cloud-rain text-white',
    'Thunderstorm': 'fa-bolt text-white',
    'Snow': 'fa-snowflake text-white',
    'Mist': 'fa-smog text-white',
    'Smoke': 'fa-smog text-white',
    'Haze': 'fa-smog text-white',
    'Dust': 'fa-smog text-white',
    'Fog': 'fa-smog text-white',
    'Sand': 'fa-smog text-white',
    'Ash': 'fa-smog text-white',
    'Squall': 'fa-smog text-white',
    'Tornado': 'fa-tornado text-white'
};

let currentCity = defaultCity;
let timezoneOffset = 0;



// Función para actualizar el pronóstico extendido
function updateExtendedForecast(city) {
    fetch(extendedApiUrl(city))
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el pronóstico extendido');
            }
            return response.json();
        })
        .then(data => {
            const extendedForecastContainer = document.getElementById('extended-forecast');
            extendedForecastContainer.innerHTML = ''; // Limpiar datos de pronóstico anteriores

            // Crear una fila para contener las tarjetas de pronóstico
            const forecastRow = document.createElement('div');
            forecastRow.classList.add('row');

            // Obtener la fecha actual y asegurar que comience desde el siguiente día
            const now = moment.utc().add(timezoneOffset, 'seconds').endOf('day');
            let currentDay = now.clone().add(1, 'day').startOf('day');

            // Recopilar datos de pronóstico para los próximos 7 días
            const dailyForecasts = [];

            for (const forecast of data.list) {
                const forecastTime = moment.unix(forecast.dt).utc().add(timezoneOffset, 'seconds');
                if (forecastTime.isSameOrAfter(currentDay, 'day')) {
                    dailyForecasts.push(forecast); // Agregar pronóstico si es para el nuevo día
                    currentDay.add(1, 'day').startOf('day'); // Pasar al siguiente día
                    if (dailyForecasts.length >= 7) break; // Detener recolección después de 7 días
                }
            }

            // Mostrar pronóstico para los próximos 7 días a partir de mañana
            dailyForecasts.forEach(forecast => {
                const forecastDate = moment.unix(forecast.dt).utc().add(timezoneOffset, 'seconds').format('dddd DD/MM');
                const forecastTemp = forecast.main.temp;
                const forecastIcon = weatherIcons[forecast.weather[0].main] || 'fa-question';

                // Crear tarjeta de pronóstico
                const forecastCol = document.createElement('div');
                forecastCol.classList.add('col-lg-2', 'col-md-3', 'col-sm-6', 'mb-2', 'mr-4'); // Columnas responsivas
                const forecastCard = document.createElement('div');
                forecastCard.classList.add('card', 'forecast-card', 'p-3', 'bg-dark', 'text-white');
                forecastCard.innerHTML = `
                    <div class="text-warning">${forecastDate}</div>
                    <div class="weather-icon my-2"><i class="fas ${forecastIcon}"></i></div>
                    <div class="temp text-white">${forecastTemp}°C</div>
                `;
                forecastCol.appendChild(forecastCard);
                forecastRow.appendChild(forecastCol);
            });

            // Agregar la fila al contenedor de pronóstico extendido
            extendedForecastContainer.appendChild(forecastRow);
        })
        .catch(error => {
            console.error('Error al obtener el pronóstico extendido:', error);
        });
}

// Actualizar el clima al cambiar la ciudad seleccionada
document.getElementById('city-select').addEventListener('change', (event) => {
    updateWeather(event.target.value);
});

// Función para actualizar la hora actual
function updateTime() {
    const weatherCard = document.getElementById('weather-card');
    if (weatherCard.innerHTML) {
        const now = moment.utc().add(timezoneOffset, 'seconds');
        const date = now.format('DD/MM/YYYY');
        const time = now.format('h:mm:ss A');
        const dateElement = weatherCard.querySelector('.date');
        const timeElement = weatherCard.querySelector('.time');
        dateElement.textContent = date;
        timeElement.textContent = time;
    }
}

// Inicializar la aplicación con la ciudad predeterminada
updateWeather(defaultCity);
setInterval(updateTime, 1000); // Actualizar la hora cada segundo

// URL para obtener pronóstico por hora
const hourlyApiUrl = (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=es&units=metric`;

// Función para actualizar el pronóstico por hora
function updateHourlyForecast(city) {
    fetch(hourlyApiUrl(city))
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el pronóstico por hora');
            }
            return response.json();
        })
        .then(data => {
            const hourlyForecastContainer = document.getElementById('hourly-forecast');
            hourlyForecastContainer.innerHTML = '';

            data.list.slice(0, 24).forEach(forecast => { // Mostrar solo las próximas 24 horas
                const forecastTime = moment.unix(forecast.dt).utc().add(timezoneOffset, 'seconds').format('HH:mm');
                const forecastTemp = forecast.main.temp;
                const forecastIcon = weatherIcons[forecast.weather[0].main] || 'fa-question';

                const forecastCard = document.createElement('div');
                forecastCard.classList.add('col', 'forecast-card');
                forecastCard.innerHTML = `
                    <div class="text-color">${forecastTime}</div>
                    <div class="weather-icon"><i class="fas ${forecastIcon}"></i></div>
                    <div class="temp text-white">${forecastTemp}°C</div>
                `;
                hourlyForecastContainer.appendChild(forecastCard);
            });
        })
        .catch(error => {
            console.error('Error al obtener el pronóstico por hora:', error);
        });
}

// URL para obtener alertas meteorológicas
const alertsApiUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${apiKey}&lang=es`;

// Función para actualizar las alertas meteorológicas
function updateWeatherAlerts(city) {
    fetch(apiUrl(city))
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener las coordenadas para las alertas');
            }
            return response.json();
        })
        .then(data => {
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            fetch(alertsApiUrl(lat, lon))
                .then(response => response.json())
                .then(alertData => {
                    const alertsContainer = document.getElementById('weather-alerts');
                    alertsContainer.innerHTML = '';

                    if (alertData.alerts && alertData.alerts.length > 0) {
                        alertData.alerts.forEach(alert => {
                            const alertCard = document.createElement('div');
                            alertCard.classList.add('alert', 'alert-warning');
                            alertCard.innerHTML = `
                                <strong>${alert.event}</strong>: ${alert.description}
                                <br><small>${new Date(alert.start * 1000).toLocaleString()} - ${new Date(alert.end * 1000).toLocaleString()}</small>
                            `;
                            alertsContainer.appendChild(alertCard);
                        });
                    } else {
                        alertsContainer.innerHTML = '<div class="alert alert-warning text-secondary">No hay alertas meteorológicas.</div>';
                    }
                })
                .catch(error => {
                    console.error('Error al obtener las alertas meteorológicas:', error);
                });
        })
        .catch(error => {
            console.error('Error al obtener las coordenadas:', error);
        });
}

// URL para obtener la calidad del aire
const airQualityApiUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// Función para obtener el icono del componente de calidad del aire
function getComponentIcon(component) {
    switch (component) {
        case 'co': return 'fa-smog';
        case 'no': return 'fa-car-crash';
        case 'no2': return 'fa-car';
        case 'o3': return 'fa-cloud';
        case 'so2': return 'fa-industry';
        case 'pm2_5': return 'fa-dust';
        case 'pm10': return 'fa-wind';
        case 'nh3': return 'fa-flask';
        default: return 'fa-question';
    }
}
//const apiUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`;
// Función para actualizar la calidad del aire
function updateAirQuality(lat, lon) {
    fetch(airQualityApiUrl(lat, lon))
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la calidad del aire');
            }
            return response.json();
        })
        .then(data => {
            const airQualityContainer = document.getElementById('air-quality');
            airQualityContainer.innerHTML = '';

            const airQualityIndex = data.list[0].main.aqi;
            const airQualityDescription = getAirQualityDescription(airQualityIndex);

            const components = data.list[0].components; // Obtener los componentes de la calidad del aire

            const airQualityCard = document.createElement('div');
            airQualityCard.classList.add('air-quality-card', 'p-3', 'style-card', 'text-white');
            airQualityCard.innerHTML = `
                <div class="text-warning">Índice de calidad del aire:<br>   <span class="aire-indice badge-secondary border border-2 border-bottom">${airQualityIndex}</span> </div>
                <div class="text-warning">Calidad: <br> <span class="aire-indice badge-secondary border border-2 border-bottom">${airQualityDescription}</span> </div>
                <div class="text-warning">Componentes:</div>
            `;
        
            // Agregar cada componente a la tarjeta
            const componentsRow = document.createElement('div');
            componentsRow.classList.add('row');

            for (const component in components) {
                const componentCol = document.createElement('div');
                componentCol.classList.add('col-6', 'col-md-4', 'col-lg-3', 'mb-3');

                const badge = document.createElement('span');
                badge.classList.add('badge', 'bg-secondary', 'd-flex', 'align-items-center');
                badge.innerHTML = `
                    <i class="fas ${getComponentIcon(component)} me-2"></i> 
                    ${component.toUpperCase()}: ${components[component]}
                `;

                componentCol.appendChild(badge);
                componentsRow.appendChild(componentCol);
            }

            airQualityCard.appendChild(componentsRow);
            airQualityContainer.appendChild(airQualityCard);
        })
        .catch(error => {
            console.error('Error al obtener la calidad del aire:', error);
        });
}

// Función para obtener la descripción de la calidad del aire
function getAirQualityDescription(index) {
    switch(index) {
        case 1: return 'Buena';
        case 2: return 'Moderada';
        case 3: return 'No saludable para grupos sensibles';
        case 4: return 'No saludable';
        case 5: return 'Muy no saludable';
        case 6: return 'Peligrosa';
        default: return 'Desconocida';
    }
} 






// Función para actualizar el clima actual

let weatherChart;

function updateWeather(city) {
    fetch(apiUrl(city))
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el clima');
            }
            return response.json();
        })
        .then(data => {
            const weatherCard = document.getElementById('weather-card');
            const iconClass = weatherIcons[data.weather[0].main] || 'fa-question';
            const timezoneOffset = data.timezone; // Offset de la zona horaria en segundos
            const now = moment.utc().add(timezoneOffset, 'seconds'); // Ajustar la hora a la zona horaria de la ciudad
            const date = now.format('DD/MM/YYYY');
            const time = now.format('h:mm:ss A');
            const windSpeedKmh = (data.wind.speed * 3.6).toFixed(2); // Convertir de m/s a km/h
            const rainProbability = data.clouds.all ? data.clouds.all : 0; // Usar la nubosidad como probabilidad de precipitaciones
            const date_humdedad   =  (data.wind.speed * 4.5);
            weatherCard.innerHTML = `
                <div class="row">
                    <div class="col-6 city color-h1">${data.name}</div>
                    <div class="col-6 temp text-white">${data.main.temp}°C</div>
                </div>
                <div class="date-time">
                    <span class="date text-white">${date}</span>
                   
                </div>
                <div class="details">
                    <i class="fas ${iconClass} weather-icon"></i>
                    <p class="text-color">Descripción: ${data.weather[0].description}</p>
                    <p class="text-color"><i class="fas fa-tint icon-small"></i> Humedad: ${data.main.humidity}%</p>
                    <p class="text-color"><i class="fas fa-wind icon-small"></i> Viento: ${windSpeedKmh} km/h</p>
                    <p class="text-color"><i class="fas fa-umbrella icon-small"></i> Prob. de precipitaciones: ${rainProbability}%</p>
                </div>
            `;

            updateExtendedForecast(city); // Actualizar pronóstico extendido
            updateHourlyForecast(city); // Actualizar pronóstico por hora
            updateWeatherAlerts(city); // Actualizar alertas meteorológicas
            updateAirQuality(data.coord.lat, data.coord.lon); // Actualizar calidad del aire con lat/lon
            updateWeatherComposition(city);

            if (weatherChart) {
                weatherChart.destroy(); // Destruir el gráfico existente antes de crear uno nuevo
            }

            const ctx = document.getElementById('weatherChart').getContext('2d');
            weatherChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Temperatura (°C)', 'Humedad (%)', 'Viento (km/h)', 'Prob. de Precipitaciones (%)'],
                    datasets: [{
                        label: `Datos del Clima de ${data.name}`,
                        data: [data.main.temp, data.main.humidity, windSpeedKmh, rainProbability],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener el clima:', error);
        });
}


        

document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '3c743983734341f81c2486dcce043049';
    const citySelect = document.getElementById('city-select');
    const cityName = document.getElementById('cityName');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weatherDescription');
    const realFeel = document.getElementById('realFeel');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const windGust = document.getElementById('windGust');
    const pressure = document.getElementById('pressure');
    const visibility = document.getElementById('visibility');
    const sensacion = document.getElementById('sensacion');
    const cloudBase = document.getElementById('cloudBase');
    const dewPoint = document.getElementById('dewPoint');
    const uvIndex = document.getElementById('uvIndex');
    const precipProbability = document.getElementById('precipProbability');
    const thunderstormProbability = document.getElementById('thunderstormProbability');
    const precipitation = document.getElementById('precipitation');
    const rain = document.getElementById('rain');
    const precipHours = document.getElementById('precipHours');
    const rainHours = document.getElementById('rainHours');
    const cloudiness = document.getElementById('cloudiness');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const moonrise = document.getElementById('moonrise');
    const moonset = document.getElementById('moonset');
    const presion_mar = document.getElementById('seaLevel');
    const presion_suelo = document.getElementById('groundLevel');
    const nextDayBtn = document.getElementById('nextDayBtn');
  
    let currentDate = new Date();
  
    function fetchWeatherData(city, date) {
      const latLon = {
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
    "Puerto Cabezas": {lat: 14.03507, lon: -83.388817},
        "London": {lat: 51.5074, lon: -0.1278},
      
        "New York": {lat: 40.78788, lon:-74.014313},
        "Tokyo": {lat:  35.689499, lon: 139.691711},
        "Sydney": {lat: -33.8688, lon: 151.2093},
    "Paris": {lat: 48.853409, lon: 2.3488},
    "Berlin": {lat: 52.566669, lon: 13.33333},
    "Moscow": {lat:  55.75222, lon:  37.615555},
    "Beijing": {lat:  39.907501, lon: 116.397232},
    "Mumbai": {lat: 19.076, lon: 72.8777},
    "Cairo": {lat: 30.0444, lon: 31.2357},
    "Buenos Aires": {lat:  -34.613152, lon: -58.377232},
    "Rio de Janeiro": {lat: -22.902781, lon: -43.2075},
    "Cape Town": {lat: -33.9249, lon: 18.4241},
    "Lagos": {lat: 6.5244, lon: 3.3792},
    "Madrid": {lat: 40.4165, lon: -3.70256},
    "Mexico City": {lat: 19.4326, lon: -99.1332},
    "Los Angeles": {lat: 34.0522, lon: -118.2437},
    "Chicago Heights": {lat:  41.506149, lon: -87.635597},
    "Toronto": {lat: 43.65107, lon: -79.347015},
    "Miami Beach": {lat: 25.790649, lon: -123.1207},
    "Sao Paulo": {lat:  -23.547501, lon: -46.636108},
    "Hong Kong": {lat: 22.3193, lon: 114.1694},
    "Bangkok": {lat: 13.7563, lon: 100.5018},
    "Seoul": {lat: 37.5665, lon: 126.978},
    "Singapore": {lat: 1.3521, lon: 103.8198},
    "Dubai": {lat: 25.2048, lon: 55.2708},
    "Istanbul": {lat: 41.0082, lon: 28.9784},
    "Jakarta": {lat: -6.2088, lon: 106.8456},
    "Lima": {lat: -12.0464, lon: -77.0428}

    
      };
  
      const { lat, lon } = latLon[city];
      const formattedDate = date.toISOString().split('T')[0];
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {    
          cityName.textContent = data.name;
          temperature.textContent = `Temperatura: ${data.main.temp}°C`;
          weatherDescription.textContent =`Descripcion: ${data.weather[0].description}` ;
          weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
         // realFeel.textContent = `Celsius®: ${data.main.feels_like}°C`;
          humidity.textContent = `Humedad: ${data.main.humidity}%`;
          windSpeed.textContent = `Viento: ${(data.wind.speed * 3.6).toFixed(2)} km/h`;
          windGust.textContent = `Ráfagas de viento: ${(data.wind.gust ? (data.wind.gust * 3.6).toFixed(2) : 0)} km/h`;
          windDeg.textContent = `Dirección del viento: ${data.wind.deg} °`;
        
          pressure.textContent = `Presión: ${data.main.pressure} mb`;
          visibility.textContent = `Visibilidad: ${data.visibility / 1000} km`;
          sensacion.textContent = `Sensación térmica: ${data.main.feels_like} °C`;
          // Se asume que la altura de las nubes no está disponible en la API actual y se omite
          cloudBase.textContent = `Techo de nubes: No disponible`;
          dewPoint.textContent = `Punto de rocío: ${data.main.temp - ((100 - data.main.humidity) / 5)}°C`;
          // Los valores de UV, precipitación y probabilidad de tormentas eléctricas no están disponibles en la API básica
          uvIndex.textContent = `Índice UV máx.: No disponible`;
          precipProbability.textContent = `Probabilidad de precipitación: No disponible`;
          thunderstormProbability.textContent = `Probabilidad de tormentas eléctricas: No disponible`;
          precipitation.textContent = `Lluvias en la ultima hora: ${data.rain ? data.rain['1h'] : 0} mm`;
          rain.textContent = `Lluvias en la ultimas 3 horas: ${data.rain ? data.rain['3h'] : 0} mm`;
          precipHours.textContent = `Horas de precipitación: No disponible`;
          rainHours.textContent = `Horas de lluvia: No disponible`;
          presion_mar.textContent = `Presión a nivel del mar: ${data.main.sea_level ? data.main.sea_level : 'No disponible'} hPa`;
          presion_suelo.textContent = `Presión a nivel del suelo: ${data.main.grnd_level ? data.main.grnd_level : 'No disponible'} hPa`;
          cloudiness.textContent = `Nubosidad: ${data.clouds.all}%`;
  
          
        })
        .catch(error => console.error('Error fetching weather data:', error));
    }
  
    // Fetch default city weather data
    fetchWeatherData('Managua', currentDate);
  
    // Fetch weather data when a new city is selected
    citySelect.addEventListener('change', function () {
     
      fetchWeatherData(this.value, currentDate);
    });
  });
  

function updateHourlyForecast(city) {
    fetch(hourlyApiUrl(city))
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el pronóstico horario');
            }
            return response.json();
        })
        .then(data => {
            const hourlyForecastCard = document.getElementById('hourly-forecast-card');
            const cityName = data.city.name; // Extraer el nombre de la ciudad
            const twoDaysData = data.list.filter((item, index) => index < 8); // Filtrar solo los datos para dos días (16 datos en total)
            const hourlyForecastHtml = twoDaysData.map(item => {
                
                const time = moment.utc(item.dt_txt).add(timezoneOffset, 'seconds').format('h:mm A');
                const iconClass = weatherIcons[item.weather[0].main] || 'fa-question';
                const temperature = item.main.temp;
                const weatherDescription = item.weather[0].description;
                const humidity = item.main.humidity;
                const windSpeed = (item.wind.speed * 3.6).toFixed(2);
                const pressure = item.main.pressure;
                const temPerseccion = item.main.feels_like ; // Volumen de lluvia en la última hora, si está disponible
                const rainProbability = item.pop * 100; // Probabilidad de lluvia
                const main_grnd_level = item.main.grnd_level;
               
                return `
                    <div class=" border border-1 border-white col-md-3 hourly-forecast-item">
                       <p>${name}</p>
                        <p class="text-center text-white text-box">${time}</p>
                        <i class="fas ${iconClass} weather-icon text-center"></i>
                        <p class="text-center text-white">${temperature}°C</p>
                        <p class="text-center text-white">Descripción: ${weatherDescription}</p>
                        <p class="text-center text-white">Humedad: ${humidity}%</p>
                        <p class="text-center text-white">Velocidad del viento: ${windSpeed} km/h</p>
                        <p class="text-center text-white">Presión atmosférica: ${pressure} hPa</p>
                        <p class="text-center text-white">percepción del clima: ${temPerseccion} °C</p>
                        <p class="text-center text-white">Probabilidad de lluvia: ${rainProbability} %</p>
                        <p class="text-center text-white">Presión atmosférica a nivel del suelo: ${main_grnd_level} hpa</p>
                      
                    </div>
                `;
            }).join('');
            hourlyForecastCard.innerHTML = `
                <div class="card border border-2 border-info style-card text-white">
                    <div class="card-body">
                        <h5 class="card-title mt-2  text-white">Pronóstico Horario para las Próximas <span class=" text-danger">24 horas</span> de ${cityName} </h5>
                        <div class="row">${hourlyForecastHtml}</div>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error al obtener el pronóstico horario:', error);
        });
}


function updateExtendedForecast(city) {
    fetch(hourlyApiUrl(city))
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el pronóstico extendido');
            }
            return response.json();
        })
        .then(data => {
            const extendedForecastCard = document.getElementById('extended-forecast-card');
            const cityName = data.city.name; // Extraer el nombre de la ciudad
            const dailyData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5); // Filtrar cada 8 intervalos (3 horas)
            const extendedForecastHtml = dailyData.map((item, index) => {
                const date = moment.utc(item.dt_txt).add(timezoneOffset, 'seconds').format('ddd, MMM DD');
                const iconClass = weatherIcons[item.weather[0].main] || 'fa-question';
                const dayTemp = item.main.temp;
                const mintTemp = item.main.temp_min;
                const maxtTemp = item.main.temp_max; // Usar temp_min como temp nocturna de ejemplo
                const weatherDescription = item.weather[0].description;
                const windSpeed = (item.wind.speed * 3.6).toFixed(2);
                const windDirection = item.wind.deg;
                const humidity = item.main.humidity;
                const feelsLike = item.main.feels_like;
                const uvIndex = item.uvi;
                const uvIndexIcon = uvIndex >= 11 ? 'fas fa-sun' : uvIndex >= 8 ? 'fas fa-sun' : uvIndex >= 6 ? 'fas fa-sun' : uvIndex >= 3 ? 'fas fa-cloud-sun' : 'fas fa-cloud';
                const pressure = item.main.pressure;
                const rainAmount = item.rain ? item.rain['3h'] : 0;
                const precipitationProbability = item.pop;
                const sunrise = moment.unix(data.city.sunrise).utc().format('HH:mm:ss');
                const sunset = moment.unix(data.city.sunset).utc().format('HH:mm:ss');

                return `
                    <li class="list-group-item border border-1 border-info">
                       
                        <div class="row">
                          
                            <div class="col text-danger"><i class="fas fa-calendar-day"></i> Fecha: ${date}</div>
                            <div class="col"><i class="fas fa-thermometer-full"></i> Temperatura:${dayTemp} °C </div>
                            <div class="col"><i class="fas fa-thermometer-full"></i> Temperatura: Max:${maxtTemp} °C / Min:${mintTemp} °C </div>
                            <div class="col"><i class="fas fa-cloud"></i> Clima: ${weatherDescription}</div>
                            <div class="col"><i class="fas fa-wind"></i> Viento: vel:${windSpeed} km/h Dir:${windDirection}°</div>
                            <div class="col"><i class="fas fa-tint"></i> Humedad: ${humidity}%</div>
                            <div class="col"><i class="fas fa-thermometer-half"></i> Sensación térmica: ${feelsLike} °C</div>
                        </div>
                         <details>
                            <summary class="col text-info">Datos adicionales <i class="fas fa-info-circle"></i></summary>
                            <div class="row">
                                <div class="col"><i class="fas fa-tachometer-alt"></i> Presión atmosférica: ${pressure} hPa</div>
                                <div class="col"><i class="fas fa-cloud-showers-heavy"></i> lluvia ultimas 3h: ${rainAmount} mm</div>
                                <div class="col"><i class="fas fa-cloud-rain"></i> Probabilidad de precipitación: ${precipitationProbability}</div>
                                <div class="col"><i class="fas fa-sun"></i> Hora de salida del sol: ${sunrise}</div>
                                <div class="col"><i class="fas fa-moon"></i> Hora del atardecer: ${sunset}</div>
                             
                            </div>
                        </details>
                    </li>
                `;
            }).join('');

            extendedForecastCard.innerHTML = `
                <div class="card style-card text-white">
                    <div class="card-body">
                        <h5 class="card-title text-white">Pronóstico del tiempo de  <span class=" text-danger">5 días</span> para ${cityName} </h5>
                        <ul class="list-group">${extendedForecastHtml}</ul>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error al obtener el pronóstico extendido:', error);
        });
}


function updateSixteenDayForecast(city) {
    fetch(extendedApiUrl(city))
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('forecast-container');
            container.innerHTML = ''; // Limpiar contenedor
            data.list.forEach(day => {
                const date = new Date(day.dt * 1000).toLocaleDateString();
                const timezone = "America/Managua"; // Zona horaria de Nicaragua

                const sunrise = moment.unix(sys.sunrise).tz(timezone).format('HH:mm:ss');
                const sunset = moment.unix(sys.sunset).tz(timezone).format('HH:mm:ss');

                const weatherItem = `
                    <div class="forecast-item">
                        <p class="text-center">Fecha: ${date}</p>
                        <p>Temp: ${day.temp.day}°C (Min: ${day.temp.min}°C, Max: ${day.temp.max}°C)</p>
                        <p>Sensación Térmica: Día: ${day.feels_like.day}°C, Noche: ${day.feels_like.night}°C</p>
                        <p>Humedad: ${day.humidity}%</p>
                        <p>Vel. Viento: ${(day.speed * 3.6).toFixed(2)} km/h</p> <!-- Convertir m/s a km/h -->
                        <p>Presión: ${day.pressure} hPa</p>
                        <p>Lluvia: ${day.rain ? day.rain + ' mm' : 'No hay datos'}</p>
                        <p>Salida del Sol: ${sunrise}</p>
                        <p>Puesta del Sol: ${sunset}</p>
                    </div>
                `;
                container.innerHTML += weatherItem;
            });
        })
        .catch(error => {
            console.error('Error al obtener el pronóstico extendido:', error);
        });
}



function mostrarMapa(url, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = `<img src="${url}" alt="Mapa del clima">`;
}


function updateWeatherComposition(city) {
    fetch(apiUrl(city))
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el clima');
            }
            return response.json();
        })
        .then(data => {
            // Filtrar para obtener solo el clima actual
            const currentWeather = data.weather[0]; // Tomamos el primer elemento del array, que es el clima actual

            const weatherConditions = {};
            weatherConditions[currentWeather.main] = 1; // Inicializamos con el clima actual

            const labels = Object.keys(weatherConditions);
            const dataValues = Object.values(weatherConditions);

            const ctx = document.getElementById('weatherCompositionChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Composición del Clima',
                        data: dataValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ]
                    }]
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener el clima:', error);
        });
}


// Función para obtener las coordenadas de la ciudad
async function getCoordinates(city) {
    const response = await fetch(apiUrl(city));
    if (!response.ok) {
        throw new Error('No se pudo obtener las coordenadas');
    }
    const data = await response.json();
    return {
        lat: data.coord.lat,
        lon: data.coord.lon,
        cityName: data.name // Nombre de la ciudad
    };
}

const apiUrl_resumen = (lat, lon) => `https://api.openweathermap.org/data/3.0/onecall/overview?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es&description=es`;



// Función para actualizar el resumen del tiempo
function updateWeatherOverview(lat, lon, cityName) {
    const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=es&units=metric`;

    fetch(apiUrlWeather)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el resumen del tiempo');
            }
            return response.json();
        })
        .then(data => {
            const weatherOverview = document.getElementById('weather-overview');
            const city = cityName;

           // const city_defauld = cityName_default;

            // Construir el mensaje completo del resumen del tiempo en español
            const temperature = `${data.main.temp}°C`;
            const feelsLike = `${data.main.feels_like}°C`;
            const windSpeed = `${ (data.wind.speed * 3.6).toFixed(2)} km/h `;
            const windDirection = data.wind.deg;
            const humidity = `${data.main.humidity}%`;
            const visibility = `${data.visibility} metros`;
            const atmosphericPressure = `${data.main.pressure} hPa`;

            const summary = `Actualmente, el clima en ${city} es ${data.weather[0].description}. La temperatura es ${temperature} con una sensación térmica de ${feelsLike}. La velocidad del viento es de ${windSpeed} desde la dirección ${windDirection} grados. La humedad es del ${humidity}. La visibilidad es de ${visibility}. La presión atmosférica es de ${atmosphericPressure}.`;

            weatherOverview.textContent = summary;

            console.log(data); // Para depuración, muestra los datos en la consola

        })
        .catch(error => {
            console.error('Error al obtener el resumen del tiempo:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('city-select');

    citySelect.addEventListener('change', async (event) => {
        const selectedCity = event.target.value;
        try {
            const coordinates = await getCoordinates(selectedCity);
            updateWeatherOverview(coordinates.lat, coordinates.lon, coordinates.cityName);
        } catch (error) {
            console.error('Error al obtener las coordenadas:', error);
        }
    });

    // Llama a updateWeatherOverview con la ciudad por defecto al cargar el documento
    getCoordinates(defaultCity)
        .then(coordinates => {
            updateWeatherOverview(coordinates.lat, coordinates.lon, coordinates.cityName);
        })
        .catch(error => {
            console.error('Error al obtener las coordenadas:', error);
        });
});


// Llamar a las funciones de actualización al iniciar
updateAirQuality(defaultCity);
