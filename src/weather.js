let apiKey = "50af66775d6be5518d0c127157771584";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

let now = new Date();
let currentDate = document.querySelector("#date");
let h2 = document.querySelector("h2");
let hours = now.getHours();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

let humid = document.querySelector("#Humidity");
let wind = document.querySelector(".Wind");
let temperature = document.querySelector("#temperature");
let description = document.querySelector("#description");
let current = document.querySelector(".current");
let icon = document.querySelector("#icon");
let celciusTemperature = null;

let h1 = document.querySelector("h1");
let formText = document.querySelector("#form-text");
let form = document.querySelector("form");

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` <div class="col-2">             
              <div class="weather-temperature-date">${day}</div>
              <img src="https://openweathermap.org/img/wn/01d@2x.png" alt="..." class="icon-day" width="50px" height="50px">
              <div class="weather-range">
                <span class="weather-temperature-max">30°</span>
                <span class="weather-temperature-min">24°</span>
              </div>
            </div> `;
  });

  forecast.innerHTML = forecastHtml;
}

displayForecast();

function changes(response) {
  let weatherCode = `${response.data.weather[0].icon}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  let iconUrl = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
  icon.setAttribute("src", iconUrl);
  icon.setAttribute("alt", response.data.weather[0].description);

  h1.innerHTML = `${response.data.name}`;
  wind.innerHTML = `${response.data.wind.speed}`;

  celciusTemperature = Math.round(response.data.main.temp);

  temperature.innerHTML = `${celciusTemperature}`;
  humid.innerHTML = `${response.data.main.humidity}`;
}

function getResult(event) {
  event.preventDefault();
  axios.get(`${apiUrl}&appid=${apiKey}&q=${formText.value}`).then(changes);
}

form.addEventListener("submit", getResult);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios.get(`${apiUrl}&appid=${apiKey}&lat=${lat}&lon=${lon}`).then(changes);
  console.log(position);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

current.addEventListener("click", currentPosition);

function fahrhenheitLink(event) {
  event.preventDefault();
  let fahrhenheitTemperature = (9 * celciusTemperature) / 5 + 32;
  temperature.innerHTML = `${Math.round(fahrhenheitTemperature)}`;
  celcLink.classList.remove("active");
  fahrLink.classList.add("active");
}

function celciusLink(event) {
  event.preventDefault();
  temperature.innerHTML = celciusTemperature;
  celcLink.classList.add("active");
  fahrLink.classList.remove("active");
}

let fahrLink = document.querySelector("#fahrenheit-temp");
let celcLink = document.querySelector("#celcius-temp");

fahrLink.addEventListener("click", fahrhenheitLink);
celcLink.addEventListener("click", celciusLink);
