let dataField = document.querySelector("#currentData");
let currentData = new Date();
let currentHours = currentData.getHours();
currentHours = ("0" + currentHours).slice(-2);
let currentMinutes = currentData.getMinutes();
currentMinutes = ("0" + currentMinutes).slice(-2);

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayOfTheWeek = weekDays[currentData.getDay()];
dataField.innerHTML = `${dayOfTheWeek} ${currentHours}:${currentMinutes}`;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);
let choseCurrentPosition = document.querySelector(".current");
choseCurrentPosition.addEventListener("click", getCurrentCity);
let chosenCity = document.querySelector("#chosen-city");
let inputCity = document.querySelector("#input-city-value");
let celsiusDegree = document.querySelector("#celsius-temp");
let fahrenheitDegree = document.querySelector("#fahrenheit-temp");
let currentTemp = document.getElementById("current-temp");
let weatherDiscription = document.querySelector(".currently_weather");
let weatherHumidityDetails = document.querySelector(".weather_humidity_detail");
let weatherWindDetails = document.querySelector(".weather_wind_detail");
let weatherIcon = document.querySelector("#weather_icon");
let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
let unit = "metric";
let celsiusTemp = null;

let basicUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=metric&appid=${apiKey}`;
axios.get(basicUrl).then(showCurrentWeather);

function getCurrentCity(event) {
  navigator.geolocation.getCurrentPosition(retrieveCurrentCity);
}

function retrieveCurrentCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCurrentWeather);
}

function showCurrentWeather(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = celsiusTemp;
  chosenCity.innerHTML = response.data.name;
  currentDegreeType.innerHTML = "°C";
  weatherDiscription.innerHTML = response.data.weather[0].main;
  weatherHumidityDetails.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  weatherWindDetails.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} m/s`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function showCity(event) {
  event.preventDefault();
  let inputCityValue = inputCity.value;
  chosenCity.innerHTML = inputCityValue;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityValue}&appid=${apiKey}&units=${unit}`;
  axios.get(weatherUrl).then(showCurrentWeather);
}

let currentDegreeType = document.querySelector("#current-degree-type");

celsiusDegree.addEventListener("click", changeToCelsius);
fahrenheitDegree.addEventListener("click", changeToFahrenheit);

function changeToFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = Math.round(celsiusTemp * 1.8 + 32);
  currentTemp.innerHTML = tempFahrenheit;
  currentDegreeType.innerHTML = "°F";
  celsiusDegree.classList.remove("active");
  fahrenheitDegree.classList.add("active");
}

function changeToCelsius(event) {
  event.preventDefault();
  currentTemp.innerHTML = celsiusTemp;
  currentDegreeType.innerHTML = "°C";
  celsiusDegree.classList.add("active");
  fahrenheitDegree.classList.remove("active");
}

function getForecast(coords) {
  apiKey = "6981613e43793d88e433ec9eeaad3dae";
  let urlForecast = `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(urlForecast).then(showForecast);
}

function formatDay(dt) {
  let date = new Date(dt * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector(".weather_forecast");
  let forecastHTML = `<div class="row forecast">`;

  forecast.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 weather_forecast_date">
      ${formatDay(day.dt)}
      <img class="weather_forecast_icon" src="http://openweathermap.org/img/wn/${
        day.weather[0].icon
      }@2x.png" width="40px" />
      <div class="col weather_forecast_temp">
        <span class="weather_forecast_temp_max">${Math.round(
          day.temp.max
        )}° </span>
        <span class="weather_forecast_temp_min">${Math.round(
          day.temp.min
        )}° </span>
      </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// let clickedF = false;
// let clickedC = false;

// function changeToFahrenheit(event) {
//   event.preventDefault();
//   if (!clickedF) {
//     clickedF = true;
//     clickedC = false;
//     let tempCelsius = currentTemp.textContent;
//     tempFahrenheit = Math.round(tempCelsius * 1.8 + 32);
//     currentTemp.innerHTML = tempFahrenheit;
//     currentDegreeType.innerHTML = "°F";
//   }
// }

// function changeToCelsius(event) {
//   event.preventDefault();
//   if (!clickedC) {
//     clickedC = true;
//     clickedF = false;
//     let tempFahrenheit = currentTemp.textContent;
//     tempCelsius = Math.round((tempFahrenheit - 32) / 1.8);
//     currentTemp.innerHTML = tempCelsius;
//     currentDegreeType.innerHTML = "°C";
//   }
// }
