import { useEffect, useState } from "react";
import useAirportStore from "../stores/useAirportStore";
import styles from "./NearbyAirports.module.css";
import { Link } from "react-router-dom";

export const NearbyAirports = () => {
  const { airport, setAirport } = useAirportStore();
  const [airportLat, setAirportLat] = useState("");
  const [airportLong, setAirportLong] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [nearestAirports, setNearestAirports] = useState([]);

  useEffect(() => {
    if (airport && airport.latitude_deg && airport.longitude_deg) {
      setAirportLat(airport.latitude_deg);
      setAirportLong(airport.longitude_deg);
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

      const apiUrl = `https://api.lufthansa.com/v1/mds-references/airports/nearest/${airportLat},${airportLong}?lang=en`;

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

  console.log(`this is in nearest airports:`, nearestAirports);
  //destructure 3 closest airports

  if (nearestAirports.NearestAirportResource) {
    const test =
      nearestAirports.NearestAirportResource.Airports.Airport[1].Names.Name.$;
    console.log(`this is in test:`, test);
  }

  const closestThree = [1, 2, 3];
  const airportName = airport?.name;

  return (
    <>
      <div>
        <h2>Closest Airports to</h2>
        <h3>{airportName}</h3>
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
                <p>
                  <Link
                    className={styles.airportLink}
                    to={`/airports/iata/${iatacode}`}
                  >
                    {name} - ({iatacode}) is {distance}km away
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
