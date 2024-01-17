import { useState, useEffect } from "react";
import majorairlines from "../../data/majorairlines.json";
import useCountryStore from "../../stores/useCountryStore";

import styles from "./AirlinesCountry.module.css";

export const AirlinesCountry = () => {
  //get country from country store (if coming from Country search)
  const { country, setCountry } = useCountryStore();
  const [countryCode, setCountryCode] = useState("");
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    //get country code from country store (store was populated in previous component - ResultsCountry)
    const countryIsoCode = country[0].iso_country;
    setCountryCode(countryIsoCode);

    //-- Function to fetch airline data from backend airlineRoutes UPDATED 17/01/24 --//

    const myAirlinesAPI = `https://final-project-airportfinder.onrender.com/airlines/country/${countryCode}`;

    const fetchIataDetails = async () => {
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
    fetchIataDetails();
  }, [countryCode, setAirlines, country]);

  // const fetchIataDetails = async () => {
  //   try {
  // Filter major airlines based on the country code
  //   if (countryIsoCode) {
  //     setAirlines(
  //       majorairlines.filter(
  //         (airline) => airline.country_code === countryIsoCode
  //       )
  //     );
  //   }
  // }, [majorairlines, country]);

  return (
    <>
      <h2>Associated Airlines</h2>

      {airlines.length === 0 ? (
        <>
          <p className={styles.noAirports}>
            There are no major airlines currently based in this country
          </p>
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
