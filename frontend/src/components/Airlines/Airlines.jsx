import { useState, useEffect } from "react";
//import majorairlines from "../../data/majorairlines.json";
import useAirportStore from "../../stores/useAirportStore";

import styles from "./Airlines.module.css";

export const Airlines = () => {
  const { airport, setAirport } = useAirportStore();
  const [countryCode, setCountryCode] = useState("");
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    //get country code from airport store (if coming from Iata search)
    setCountryCode(airport?.iso_country);

    //-- Function to fetch airline data from backend airlineRoutes UPDATED 17/01/24 --//
    const myAirlinesAPI = `https://final-project-airportfinder.onrender.com/airlines/country/${countryCode}`;

    const fetchAirlines = async () => {
      try {
        const response = await fetch(myAirlinesAPI);
        if (!response.ok) {
          throw new Error("Network Response Error");
        }
        const json = await response.json();
        setAirlines(json);
      } catch (error) {
        console.log("Error fetching iata data:", error);
      } finally {
      }
    };
    fetchAirlines();
  }, [countryCode, setAirlines]);

  //-- OLD METHOD to get data from json in frontend ---//
  // useEffect(() => {
  // Filter major airlines based on the country code
  //   setAirlines(
  //     majorairlines.filter((airline) => airline.country_code === countryCode)
  //   );
  // }, [majorairlines, countryCode]);

  return (
    <>
      <h2>Associated Airlines</h2>
      {airlines.length === 0 ? (
        <>
          <p>There are no major airlines currently based in this country</p>
        </>
      ) : (
        <>
          <div className={styles.airlineList}>
            {airlines.map((airline, index) => (
              <div key={index}>
                <p className={styles.airlineLink}>
                  {airline.name && (
                    <a
                      href={airline.Link}
                      className={styles.airportLink}
                      target="_blank"
                      key={airline.name}
                      rel="noreferrer noopener"
                    >
                      {airline.name}
                    </a>
                  )}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
