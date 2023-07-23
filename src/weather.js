let apiKey = "50af66775d6be5518d0c127157771584";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

let now = new Date();
let currentDate = document.querySelector("#date");
let h2 = document.querySelector("h2");
let hours = now.getHours();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let minutes = now.getMinutes();
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

let humid = document.querySelector(".Humidity");
let wind = document.querySelector(".Wind");
let temperature = document.querySelector(".temperature");

let h1 = document.querySelector("h1");
let formText = document.querySelector("#form-text");

function changes(response) {
  humid.innerHTML = `${response.data.main.humid}`;
  wind.innerHTML = `${response.data.main.wind}`;
  temperature.innerHTML = `${response.data.main.temp}`;
}

function getResult(event) {
  event.preventDefault();

  h1 = `Weather in ${formText.value}`;

  axios.get(`${apiUrl}&appid=${apiKey}&q=${formText.value}`).then(changes);
}

formText.addEventListener("submit", getResult);
