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

  const currentName = weatherForCity.name;
  console.log(`details in array:`, weatherForCity);
  // const currentLat = weatherForCity.coord.lat;
  // const currentLong = weatherForCity.coord.lon;

  const currentLat = weatherForCity.coord ? weatherForCity.coord.lat : "N/A";
  const currentLong = weatherForCity.coord ? weatherForCity.coord.lon : "N/A";

  return (
    <>
      <div>Weather</div>
      <p>{currentName}</p>
      <p>{currentLat}</p>
      <p>{currentLong}</p>
    </>
  );
};
