function searchCity(event){
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = document.querySelector("#current-city");
    city.innerHTML = searchInputElement.value;
    
}
function formattedDate(date){
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",searchCity);

let currentDateElement = document.querySelector("#current-time");
let currentDate = new Date();

currentDateElement.innerHTML = formattedDate(currentDate);
