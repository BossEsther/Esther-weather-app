function displayTemperature(response){
    console.log(response.data)
    let temperature = Math.round(response.data.temperature.current);
    let temperatureElement = document.querySelector("#current-temperature-value");
    let cityElement = document.querySelector("#current-city");
    let windElement = document.querySelector("#wind-speed");
    let humidityElement = document.querySelector("#humidity-percentage");
    let descriptionElement = document.querySelector("#description-details");
    let currentDateElement = document.querySelector("#current-time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon-image");

    
    temperatureElement.innerHTML = temperature;
    cityElement.innerHTML = response.data.city;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
    descriptionElement.innerHTML= response.data.condition.description;   
    currentDateElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img  src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
    
    getForecast(response.data.city);
    
}
function formatDate(date){
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    if(hours < 10){
       hours = `0${hours}`;
    }

    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;

}

function citySearch(city){
    let apiKey = `to4b1410aa2839a0042157f44d3803ee`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}

function searchCity(event){
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");

    citySearch(searchInputElement.value);
    
}
function getForecast(city){
    let apiKey = `to4b1410aa2839a0042157f44d3803ee`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayForecast);

}
function displayForecast(response){
    
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let forecastHtml = "";
    days.forEach(function(day) {
        forecastHtml = forecastHtml + 
        `
        <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">🌤️</div>
            <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                   <strong>18º</strong>
                </div>
                <div class="weather-forecast-temperature">20º</div> 
            </div>
        </div>
        `;
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",searchCity);

citySearch("Lagos");
