var button = document.querySelector('button');
var cityInput= document.querySelector('input');
var weather_info = document.getElementById('weather_info');

var apiKey = '6a7273e2810d488fe80d973dc7f5acb4';
var baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
// var api_link = 'https://api.openweathermap.org/data/2.5/weather?q=' + city_name +'&appid=' + api_key + '&units=metric';

//By default on reload we get Rostock's weather
// var city = cityInput.value.trim();
// getWeather(city);

//Accepting city name
button.addEventListener('click' , function() {
    if (cityInput.value !== '') {
        var city = cityInput.value.trim();
        getWeather(city);
    }
    else {
        weather_info.innerHTML = `<p>Please enter a city name.</p>`;
    }
    
})


//Fetch Weather Data
function getWeather(city) {
    var url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`; // API URL with the city name

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found: ${response.status}`);
            }
            return response.json(); // Convert the response to JSON
        })
        .then(data => displayWeather(data)) // Display the weather data

        .catch(error => {
            console.error('Error fetching weather data:', error);
            weather_info.innerHTML = `<p>${error.message}</p>`;
        });
}

// Display weather data on the page
function displayWeather(data) {
    const { name, main, weather} = data;

    const description = weather[0].description;

    // Get the background color for the weather description
    const bgColor = getBackgroundColor(description);

    // Update the weather info container
    const body_background = document.querySelector('body');
    body_background.style.background = bgColor; // Apply background color



    weather_info.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Feels Like: ${main.feels_like}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
}

function getBackgroundColor(description) {
    const colors = {
        // Clear/Cloudy
        "clear sky": "#87CEEB",
        "few clouds": "#D3D3D3",
        "scattered clouds": "#B0C4DE",
        "broken clouds": "#778899",
        "overcast clouds": "#696969",

        // Rain/Drizzle
        "light rain": "#A4B3B6",
        "moderate rain": "#6E7F80",
        "heavy intensity rain": "#5F6A6A",
        "very heavy rain": "#4682B4",
        "extreme rain": "#2F4F4F",
        "light intensity drizzle": "#AFEEEE",
        "drizzle": "#ADD8E6",
        "heavy intensity drizzle": "#00CED1",

        // Thunderstorm
        "thunderstorm with light rain": "#483D8B",
        "thunderstorm with rain": "#4B0082",
        "thunderstorm with heavy rain": "#191970",
        "light thunderstorm": "#9370DB",
        "thunderstorm": "#301934",

        // Snow
        "light snow": "#E0FFFF",
        "snow": "#FFFFFF",
        "heavy snow": "#B0E0E6",
        "sleet": "#C0C0C0",

        // Atmosphere
        "mist": "#E0FFFF",
        "smoke": "#696969",
        "haze": "#F5F5DC",
        "dust": "#F4A460",
        "fog": "#DCDCDC",
        "sand": "#EDC9AF",
        "volcanic ash": "#A9A9A9",

        // Extreme Conditions
        "tornado": "#2F4F4F",
        "hurricane": "#1C2833",
        "cold": "#A9DCE3",
        "hot": "#FF4500",
        "windy": "#B0C4DE",
    };

    return colors[description] || "#CCCCCC"; // Default color for unknown descriptions
}

