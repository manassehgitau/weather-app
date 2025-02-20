import { OPENWEATHER_API_KEY } from "./config.js";

let description;
let locationName;
let cityName;
let currentTemp = 0;
let humidity = 0;
let altitude = 0;
let visibility = 0;
let windSpeed = 0;
let pressure = 0;

document
  .getElementById("cityForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents form from actually submitting
    let keyedName = document.getElementById("cityName").value;
    if (keyedName.trim() === "") {
      document.getElementById("formMessage").textContent =
        "Please enter a valid name!";
    } else {
      cityName = keyedName;
      fetchWeatherData();
    }
  });

async function fetchWeatherData() {
  try {
    const apiKey = OPENWEATHER_API_KEY;
    const baseURL = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${cityName}`;
    let weatherResponse = await fetch(baseURL);

    let weatherData = await weatherResponse.json();

    console.log(weatherResponse.status);

    // let descriptionObject = weatherData.weathe;
    // console.log(descriptionObject[1]);
    // // for (const [key, value] of Object.entries(descriptionObject)) {
    //   if (key === "description"){
    //     console.log(value);
    //     description = value;
    //   }
    // }

    locationName = weatherData.name;
    currentTemp = Math.floor(weatherData.main.temp - 274);
    humidity = weatherData.main.humidity;
    altitude = weatherData.main.sea_level;

    visibility = weatherData.visibility;
    windSpeed = weatherData.wind.speed;
    pressure = weatherData.main.pressure;

    updateWeatherConditions();

    if (!weatherResponse.ok) {
      console.log("failed to fetch data!");
      return;
    }
  } catch (error) {
    console.log(`Error: `, error);
  }
}

function updateWeatherConditions() {
  let locationDiv = document.getElementById("location");
  locationDiv.innerHTML = `
    <p class="location-icon text-3xl px-4"><i class="fa-solid fa-location-dot"></i> <span class="text-lg ml-2 text-bg-blue-200" id="location">${locationName}</span></p>
    <p class="text-lg" id="weather-description">-</p>
    <button type="submit" id="restart-icon"><i class="fa-solid fa-rotate-left"></i> Reset</p>
  `;

  document.getElementById("condition-status-temp").textContent =
    currentTemp + " °C";
  document.getElementById("condition-status-humidity").textContent =
    humidity + "%";
  document.getElementById("condition-status-altitude").textContent =
    altitude + " hPa";
  document.getElementById("condition-status-visibility").textContent =
    visibility + " km";
  document.getElementById("condition-status-wind").textContent =
    windSpeed + " m/s";
  document.getElementById("condition-status-pressure").textContent =
    pressure + " hPa";
  console.log(description);
  console.log(currentTemp);
  console.log(humidity);
  console.log(altitude);
  console.log(visibility);
  console.log(windSpeed);
  console.log(pressure);
}

 
 document.getElementById("restart-icon").addEventListener("onclick", function (){
  event.stopPropagation();Reset
  let locationDiv = document.getElementById("location");
  locationDiv.innerHTML = `
    <form id="cityForm">
          <input type="text" id="cityName" placeholder="Enter name of the City"
            class="border-2 border-[#0a1f44] rounded-2xl" required />
          <button type="submit" class="px-2 py-1 mx-2 bg-[#0a1f44] text-white text-xs rounded-2xl">Submit</button>
    </form>
        <p id="formMessage"></p>
        <button type="submit" id="restart-icon" class="mt-3"><i class="fa-solid fa-rotate-left"></i> Reset</p>
  `;
  console.log("Page restarted!")
});
