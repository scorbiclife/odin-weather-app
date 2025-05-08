import "./index.css";
import { fetchWeather, extractCurrentWeatherData } from "./api/weather.js";

function weatherComponent({
  resolvedAddress,
  description,
  date,
  temp,
  feelslikeTemp,
}) {
  const resolvedAddressElement = document.createElement("div");
  resolvedAddressElement.textContent = `Location: ${resolvedAddress}`;

  const descriptionElement = document.createElement("div");
  descriptionElement.textContent = `Description: ${description}`;

  const dateElement = document.createElement("div");
  dateElement.textContent = `Current date: ${date}`;

  const temperatureElement = document.createElement("div");
  temperatureElement.textContent = `Current Temperature: ${temp}`;

  const feelslikeTemperatureElement = document.createElement("div");
  feelslikeTemperatureElement.textContent = `Feels Like: ${feelslikeTemp}`;

  const weatherElement = document.createElement("div");
  weatherElement.append(
    resolvedAddressElement,
    descriptionElement,
    dateElement,
    temperatureElement,
    feelslikeTemperatureElement,
  );
  return weatherElement;
}

function updateWeather(location) {
  weatherDataContainerElement.replaceChildren("Loading...");
  fetchWeather(location)
    .then(extractCurrentWeatherData)
    .then(
      ({ description, datetimeEpoch, temp, feelslike, resolvedAddress }) => {
        weatherDataContainerElement.replaceChildren(
          weatherComponent({
            resolvedAddress,
            description,
            date: new Date(datetimeEpoch * 1000),
            temp,
            feelslikeTemp: feelslike,
          }),
        );
      },
    );
}

const contentElement = (function () {
  const contentElementOrNull = document.getElementById("content");
  if (contentElementOrNull !== null) {
    return contentElementOrNull;
  }

  const contentElement = document.createElement("div");
  contentElement.id = "content";
  document.body.appendChild(contentElement);
  return contentElement;
})();

const inputFormElement = (function () {
  const locationInputElementId = "location";

  const labelElement = document.createElement("label");
  labelElement.htmlFor = locationInputElementId;
  labelElement.textContent = "Enter Location: ";

  const formInputElement = document.createElement("input");
  formInputElement.id = locationInputElementId;

  const submitButtonElement = document.createElement("button");
  submitButtonElement.textContent = "Submit";
  submitButtonElement.addEventListener("click", (event) => {
    updateWeather(formInputElement.value);
    // Prevent form submission
    event.preventDefault();
  });

  const formElement = document.createElement("form");
  formElement.append(labelElement, formInputElement, submitButtonElement);

  return formElement;
})();
contentElement.appendChild(inputFormElement);

const weatherDataContainerElement = document.createElement("div");
contentElement.appendChild(weatherDataContainerElement);
