import { useEffect, useState } from "react";
import useAirportStore from "../../stores/useAirportStore";
import * as geolib from "geolib";
import styles from "./Distance.module.css";

//using Lufthansa Developer Center API to find nearest airports to the user
//My Lufthansa API key: w6wtw5xph6gayfqy6vqdrdgh8

export const Distance = () => {
  const [accessToken, setAccessToken] = useState(null);
  const { airport, setAirport } = useAirportStore();
  const [airportLat, setAirportLat] = useState("");
  const [airportLong, setAirportLong] = useState("");
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);
  const [locationOff, setlocationOff] = useState(true);
  const [nearestAirports, setNearestAirports] = useState("");
  const [inputMetres, setInputMetres] = useState("");
  const [resultKm, setResultKm] = useState(null);

  //----------Calculate distance----------//

  //defractor lat and long of airport from airport store
  useEffect(() => {
    if (airport && airport.latitude_deg && airport.longitude_deg) {
      setAirportLat(airport.latitude_deg);
      setAirportLong(airport.longitude_deg);
    }

    //get users ip address and convert to lat and long
    //this will only work if user has location set as on on their browser.
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLat(latitude);
            setUserLong(longitude);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();

    //calculate distance using geolib library----//
    // const distance = geolib.getDistance(
    //   { latitude: userLat, longitude: userLong },
    //   { latitude: airportLat, longitude: airportLong }
    // );

    // console.log(`distance between is:`, distance);
  }, [airport]);

  //-------Get data from Lufthansa API--------//

  // useEffect(() => {
  //   //---POST request for access token ----//
  //   const fetchAccessToken = async () => {
  //     const apiUrl = "https://api.lufthansa.com/v1/oauth/token";
  //     const clientId = "w6wtw5xph6gayfqy6vqdrdgh8";
  //     const clientSecret = "3p6tzwart8";

  //     const data = new URLSearchParams({
  //       client_id: clientId,
  //       client_secret: clientSecret,
  //       grant_type: "client_credentials",
  //     });

  //     const requestOptions = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: data,
  //     };

  //     try {
  //       const response = await fetch(apiUrl, requestOptions);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const responseData = await response.json();
  //       setAccessToken(responseData.access_token);
  //     } catch (error) {
  //       console.error("Error:", error.message);
  //     }
  //   };

  //   fetchAccessToken();
  // }, []);

  // useEffect(() => {
  //   //---GET request for nearest airport from lat and long ----//
  //   const fetchData = async () => {
  //     if (!accessToken) {
  //       console.log(`access token not going through`);
  //       return;
  //     }

  //     const apiUrl = `https://api.lufthansa.com/v1/mds-references/airports/nearest/${userLat},${userLong}?lang=en`;

  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         Accept: "application/json",
  //       },
  //     };

  //     fetch(apiUrl, requestOptions)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log("Response:", data);
  //         setNearestAirports(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error.message);
  //       });
  //   };
  //   fetchData();
  // }, [accessToken]);

  //destructure 3 closest airports

  return (
    <>
      {locationOff ? (
        <p>
          Your location permissions are currently disabled so we cannot display
          this information
        </p>
      ) : (
        <>
          <div>Distance</div>
          <p>this airport is ???km away from you</p>
          <p>The following airports are closest to you</p>
        </>
      )}
    </>
  );
};
