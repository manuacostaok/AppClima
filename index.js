const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    

    const APIKey = '5738223ed89b662a5da1163d481e5065';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const imagen = document.querySelector('.weather-box img');
            const temperatura = document.querySelector('.weather-box .temperature');
            const descripcion = document.querySelector('.weather-box .description');
            const humedad = document.querySelector('.weather-details .humidity span');
            const viento = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    imagen.src = 'img/clear.png';
                    break;

                case 'Rain':
                    imagen.src = 'img/rain.png';
                    break;

                case 'Snow':
                    imagen.src = 'img/snow.png';
                    break;

                case 'Clouds':
                    imagen.src = 'img/cloud.png';
                    break;

                case 'Haze':
                    imagen.src = 'img/mist.png';
                    break;

                default:
                    imagen.src = '';
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descripcion.innerHTML = `${json.weather[0].description}`;
            humedad.innerHTML = `${json.main.humidity}%`;
            viento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});