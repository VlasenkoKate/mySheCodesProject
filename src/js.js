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
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  chosenCity.innerHTML = response.data.name;
  weatherDiscription.innerHTML = response.data.weather[0].main;
  weatherHumidityDetails.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  weatherWindDetails.innerHTML = `Wind: ${response.data.wind.speed} m/s`;
  console.log(response.data.weather[0].icon);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
let clickedF = false;
let clickedC = false;

function changeToFahrenheit(event) {
  event.preventDefault();
  if (!clickedF) {
    clickedF = true;
    clickedC = false;
    let tempCelsius = currentTemp.textContent;
    tempFahrenheit = Math.round(tempCelsius * 1.8 + 32);
    currentTemp.innerHTML = tempFahrenheit;
    currentDegreeType.innerHTML = "°F";
  }
}

function changeToCelsius(event) {
  event.preventDefault();
  if (!clickedC) {
    clickedC = true;
    clickedF = false;
    let tempFahrenheit = currentTemp.textContent;
    tempCelsius = Math.round((tempFahrenheit - 32) / 1.8);
    currentTemp.innerHTML = tempCelsius;
    currentDegreeType.innerHTML = "°C";
  }
}
