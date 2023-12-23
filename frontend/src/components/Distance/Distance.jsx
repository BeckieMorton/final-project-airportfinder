import { useEffect, useState } from "react";
import useAirportStore from "../../stores/useAirportStore";
import * as geolib from "geolib";
import { getDistance } from "geolib";
import styles from "./Distance.module.css";

//using Lufthansa Developer Center API to find nearest airports to the user
//My Lufthansa API key: w6wtw5xph6gayfqy6vqdrdgh8

export const Distance = () => {
  const [accessToken, setAccessToken] = useState(null);
  const { airport, setAirport } = useAirportStore();
  const [airportLat, setAirportLat] = useState("");
  const [airportLong, setAirportLong] = useState("");
  const [locationOff, setlocationOff] = useState(true);
  const [nearestAirports, setNearestAirports] = useState("");
  const [inputMetres, setInputMetres] = useState("");
  const [resultKm, setResultKm] = useState(null);
  const [userLat, setUserLat] = useState("");
  const [userLong, setUserLong] = useState("");

  //----------Calculate distance----------//

  //defractor lat and long of airport from airport store
  useEffect(() => {
    if (airport && airport.latitude_deg && airport.longitude_deg) {
      setAirportLat(airport.latitude_deg);
      setAirportLong(airport.longitude_deg);
    }

    //get user location as latitude and longitude

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setUserLat(latitude);
      setUserLong(longitude);
      setlocationOff(false);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  }, [airport]);

  //compare user location to airport location and tell them how far away they are from it.

  useEffect(() => {
    if (airport && airport.latitude_deg && airport.longitude_deg) {
      setAirportLat(airport.latitude_deg);
      setAirportLong(airport.longitude_deg);
    }
  }, [airport]);

  //get distance with userLat, userLong, airportLat, airportLong

  const distance = (
    getDistance(
      { latitude: userLat, longitude: userLong },
      { latitude: airportLat, longitude: airportLong }
    ) / 1000
  ).toFixed(1);

  console.log(`distance is:`, distance);

  //-------Get data from Lufthansa API--------//
  //IN NEARBY AIRPORTS COMPONENT

  return (
    <>
      {locationOff ? (
        <p>
          Your location permissions are currently disabled so we cannot display
          this information
        </p>
      ) : (
        <>
          <div>
            <p>This airport is {distance}km away from you.</p>
          </div>
        </>
      )}
    </>
  );
};
