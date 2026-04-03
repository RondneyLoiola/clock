const API_KEY = '255ac7285cf4495692a41038260304';

const buttonSearch = document.getElementById('citySearch');
const cityName = document.getElementById('city_name');
const cityTemp = document.getElementById('city_temp');
const cityHour = document.getElementById('city_hour');
const cityGmt = document.getElementById('city_gmt');
const cityCountry = document.getElementById('city_country');

const getWeather = async (cityToSearch) => {
    const city = cityToSearch || document.getElementById('cityInput').value.trim();
    const input = document.getElementById('cityInput');

    if(!city) {
        return;
    }

    if(API_KEY !== '255ac7285cf4495692a41038260304') {
        return
    }

    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&lang=en`;

        const response = await fetch(url)

        if(!response.ok) {
            throw new Error('City not found')
        }

        const data = await response.json()
        console.log(data);

        showResults(data);
        
    } catch (error) {
        console.error('Error:', error);
        input.classList.add('error');
    }
}

function showResults(data) {
    console.log(data)
    cityName.textContent = data.location.name;
    cityTemp.textContent = `${Math.round(data.current.temp_c)}`;
    cityHour.textContent = `${formatHours(data.location.localtime)}`;
    cityGmt.textContent = data.location.tz_id;
    cityCountry.textContent = data.location.country;

    const input = document.getElementById('cityInput');
    input.value = '';
    input.classList.remove('error');
}

function formatHours(datetime) {
    const date = new Date(datetime);
    return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

buttonSearch.addEventListener('click', () => getWeather());

window.addEventListener('DOMContentLoaded', () => {
    getWeather('London');
});
