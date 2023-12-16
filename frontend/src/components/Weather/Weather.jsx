import React from "react";
import { useEffect, useState } from "react";

export const Weather = () => {
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "9055fb4826563eac25a47e211073a627"; //Beckie's API key

  //define coordinates object
  const coordinates = {
    lat: 78.2,
    long: 15.6,
  };
  //get longitude and latitude value from airport.municipality

  const currentWeather = `${BASE_URL}?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&APPID=${API_KEY}`;

  const [weatherForCity, setWeatherForCity] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(currentWeather);
        if (!response.ok) {
          throw new Error("Network Response Error");
        }
        const json = await response.json();
        setWeatherForCity(json);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchWeather();
  }, [currentWeather]);

  console.log(`details in weather array:`, weatherForCity);

  const currentName = weatherForCity.name ? weatherForCity.name : "N/A";
  const currentLat = weatherForCity.coord ? weatherForCity.coord.lat : "N/A";
  const currentLong = weatherForCity.coord ? weatherForCity.coord.lon : "N/A";
  const currentTemp = weatherForCity.main ? weatherForCity.main.temp : "N/A";
  const currentFeelsLike = weatherForCity.main
    ? weatherForCity.main.feels_like
    : "N/A";

  const weatherMain = weatherForCity.weather
    ? weatherForCity.weather[0].main
    : "N/A";

  const weatherDesc = weatherForCity.weather
    ? weatherForCity.weather[0].description
    : "N/A";

  return (
    <>
      <div>Weather</div>
      <p>Name: {currentName}</p>
      <p>Latitude: {currentLat}</p>
      <p>Longitude: {currentLong}</p>
      <p>Current Temp: {currentTemp}</p>
      <p>Feels like: {currentFeelsLike}</p>
      <p>Weather: {weatherMain}</p>
      <p>Weather description: {weatherDesc}</p>
    </>
  );
};
