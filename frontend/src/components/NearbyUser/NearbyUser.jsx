import { useEffect, useState } from "react";
import useAirportStore from "../../stores/useAirportStore";
import styles from "./NearbyUser.module.css";
import { Link } from "react-router-dom";

export const NearbyUser = () => {
  const { airport, setAirport } = useAirportStore();
  const [accessToken, setAccessToken] = useState(null);
  const [nearestAirports, setNearestAirports] = useState([]);
  const [userLat, setUserLat] = useState("");
  const [userLong, setUserLong] = useState("");
  const [locationOff, setlocationOff] = useState(true);

  //----------Calculate distance----------//
  useEffect(() => {
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

  //-------Get data from Lufthansa API--------//

  useEffect(() => {
    //---POST request for access token ----//
    const fetchAccessToken = async () => {
      const apiUrl = "https://api.lufthansa.com/v1/oauth/token";
      const clientId = "w6wtw5xph6gayfqy6vqdrdgh8";
      const clientSecret = "3p6tzwart8";

      const data = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      };

      try {
        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setAccessToken(responseData.access_token);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    //---GET request for nearest airport from lat and long ----//
    const fetchData = async () => {
      if (!accessToken) {
        console.log(`access token not going through`);
        return;
      }

      const apiUrl = `https://api.lufthansa.com/v1/mds-references/airports/nearest/${userLat},${userLong}?lang=en`;

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      };

      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setNearestAirports(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    };
    fetchData();
  }, [accessToken]);

  console.log(`this is in nearest to user:`, nearestAirports);

  //destructure 3 closest airports to user
  if (nearestAirports.NearestAirportResource) {
    const test =
      nearestAirports.NearestAirportResource.Airports.Airport[1].Names.Name.$;
  }

  const closestThree = [0, 1, 2];

  return (
    <>
      <div>
        <h2>Closest Airports to your location</h2>
      </div>
      <div>
        {closestThree.map((index) => {
          const airport =
            nearestAirports?.NearestAirportResource?.Airports?.Airport?.[index];

          // Check if the airport exists
          if (airport) {
            const name = airport.Names.Name.$;
            const distance = airport.Distance.Value;
            const iatacode = airport.AirportCode;

            return (
              <div key={index}>
                <p classname={styles.airportList}>
                  <Link
                    className={styles.airportLink}
                    to={`/airports/iata/${iatacode}`}
                  >
                    {name} - ({iatacode}) - is {distance}km away
                  </Link>
                </p>
              </div>
            );
          } else {
            // Handle the case where the airport doesn't exist at the specified index
            return null;
          }
        })}
      </div>
    </>
  );
};
