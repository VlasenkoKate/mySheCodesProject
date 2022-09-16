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

function showCity(event) {
  let chosenCity = document.querySelector("#chosen-city");
  let inputCity = document.querySelector("#input-city-value");
  event.preventDefault();
  chosenCity.innerHTML = inputCity.value;
}

let celsiusTemp = document.querySelector("#celsius-temp");
let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
let currentTemp = document.getElementById("current-temp");
let tempBasic = currentTemp.textContent;

let currentDegreeType = document.querySelector("#current-degree-type");

celsiusTemp.addEventListener("click", changeToCelsius);
fahrenheitTemp.addEventListener("click", changeToFahrenheit);
let clickedF = false;
let clickedC = false;

function changeToFahrenheit(event) {
  event.preventDefault();
  if (!clickedF) {
    clickedF = true;
    clickedC = false;
    tempBasic = Math.round(tempBasic * 1.8 + 32);
    currentTemp.innerHTML = tempBasic;
    currentDegreeType.innerHTML = "°F";
    return tempBasic;
  }
}

function changeToCelsius(event) {
  event.preventDefault();
  if (!clickedC) {
    clickedC = true;
    clickedF = false;
    tempBasic = Math.round((tempBasic - 32) / 1.8);
    currentTemp.innerHTML = tempBasic;
    currentDegreeType.innerHTML = "°C";
    return tempBasic;
  }
}

// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   kyiv: {
//     temp: 22,
//     humidity: 20,
//   },
// };

// let city = prompt("Enter a city").trim();
// let cityLowerCase = city.toLowerCase();

// if (cityLowerCase === "moscow") {
//   alert(`Russian warship, go fuck yourself! Try Kyiv instead`);
// } else if (weather[cityLowerCase] !== undefined) {
//   let tempС = Math.round(weather[cityLowerCase].temp);
//   let tempF = Math.round(tempС * 1.8 + 32);
//   let humidity = weather[cityLowerCase].humidity;
//   alert(
//     `It is currently ${tempС}°С (${tempF}°F) in ${city} with a humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

// function showTemp() {
//   let city = prompt("Enter a city").trim();
//   if (city === "Paris") {
//     alert(
//       `It is currently ${Math.round(
//         weather.paris.temp
//       )}°С in ${city} with a humidity of ${weather.paris.humidity}%`
//     );
//   } else if (city === "Tokyo") {
//     alert(
//       `It is currently ${Math.round(
//         weather.tokyo.temp
//       )}°С in ${city} with a humidity of ${weather.tokyo.humidity}%`
//     );
//   } else if (city === "Lisbon") {
//     alert(
//       `It is currently ${Math.round(
//         weather.lisbon.temp
//       )}°С in ${city} with a humidity of ${weather.lisbon.humidity}%`
//     );
//   } else if (city === "San Francisco") {
//     alert(
//       `It is currently ${Math.round(
//         weather["san francisco"].temp
//       )}°С in ${city} with a humidity of ${weather["san francisco"].humidity}%`
//     );
//   } else if (city === "Moscow") {
//     alert(`Russian warship, go fuck yourself! Try Kyiv instead`);
//   } else if (city === "Kyiv") {
//     alert(
//       `Slava Ukraini! It is currently ${Math.round(
//         weather.kyiv.temp
//       )}°С in ${city} with a humidity of ${weather.kyiv.humidity}%`
//     );
//   } else {
//     alert(
//       `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//     );
//   }
// }
// showTemp();
