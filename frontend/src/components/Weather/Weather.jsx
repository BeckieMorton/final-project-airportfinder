import React from "react";
import { useEffect, useState } from "react";
import useAirportStore from "../../stores/useAirportStore";

export const Weather = () => {
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "9055fb4826563eac25a47e211073a627"; //Beckie's API key

  const { airport, setAirport } = useAirportStore();
  const [loading, setLoading] = useState(true);
  const [lat, setLatitude] = useState(null);
  const [long, setLongitude] = useState(null);
  const [weatherForCity, setWeatherForCity] = useState({});

  //get longitude and latitude value from airport.municipality
  useEffect(() => {
    if (airport && airport.latitude_deg && airport.longitude_deg) {
      setLatitude(airport.latitude_deg);
      setLongitude(airport.longitude_deg);
      setLoading(false);
    }
  }, [airport]);

  const currentWeather = `${BASE_URL}?lat=${lat}&lon=${long}&units=metric&APPID=${API_KEY}`;

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
