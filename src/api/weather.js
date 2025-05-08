export async function fetchWeather(location) {
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=XECFF3FEVGBC2KLQBV5UD3TUE`,
  ).then((response) => response.json());
}

export function extractCurrentWeatherData(weather) {
  const { description, resolvedAddress } = weather;
  const { datetimeEpoch, temp, feelslike } = weather.currentConditions;
  return {
    resolvedAddress,
    description,
    datetimeEpoch,
    temp,
    feelslike,
  };
}
