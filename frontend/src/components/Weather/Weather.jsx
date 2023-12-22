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

  //assign icon to weather to display

  let weatherImage = "";

  switch (weatherMain) {
    case "Clouds":
      weatherImage = "/assets/weather-clouds.png";
      break;
    case "Clear":
      weatherImage = "/assets/weather-clear.png";
      break;
    case "Snow":
      weatherImage = "/assets/weather-snow.png";
      break;
    case "Rain":
    case "Drizzle":
      weatherImage = "/assets/weather-rain.png";
      break;
    case "Thunderstorm":
      weatherImage = "/assets/weather-thunderstorm.png";
      break;
    default:
      //case for Mist, Smoke, Haze, Dust, Fog, Sand, Dust, Ash, Squall, Tornado
      weatherImage = "/assets/weather-other.png";
      break;
  }

  //display time and date
  const Clock = (props) => {
    const timezone = props;
    //---Get current time at airport -----//
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      second: "2-digit",
    };
    let newTime = new Date(
      (weatherForCity.dt + timezone + new Date().getTimezoneOffset() * 60) *
        1000
    ).toLocaleTimeString([], options);

    return newTime;
  };

  const time = Clock(weatherForCity.timezone);

  return (
    <>
      <div>
        <p>{time}</p>
      </div>
      <div>
        <img src={weatherImage} />
      </div>
      <h2>{currentTemp}°C</h2>
      <p>Feels like: {currentFeelsLike}</p>
      <h2>{weatherMain}</h2>
      <p>{weatherDesc}</p>
    </>
  );
};
