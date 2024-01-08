import { useState, useEffect } from "react";
import majorairlines from "../../data/majorairlines.json";
import useAirportStore from "../../stores/useAirportStore";

import styles from "./Airlines.module.css";

export const Airlines = () => {
  const { airport, setAirport } = useAirportStore();
  const [countryCode, setCountryCode] = useState("");
  const [airlines, setAirlines] = useState("");
  const [countryContinent, setCountryContinent] = useState("");

  //use json airline data to find matches for all the airlines that have the same country code
  //i have done this differently here than i have to get the country codes in the MainSearch. im not sure why i have and which is better? perhaps using the fetch in MainSearch is better?

  useEffect(() => {
    //get country code from airport store
    setCountryCode(airport?.iso_country);
    // Filter major airlines based on the country code
    setAirlines(
      majorairlines.filter((airline) => airline.country_code === countryCode)
    );
  }, [majorairlines, countryCode]);

  useEffect(() => {
    // Set country continent
    const foundAirline = majorairlines.find(
      (airline) => airline.country_code === countryCode
    );
    setCountryContinent(foundAirline?.continent || "");

    console.log(`the country continent is:`, countryContinent);
  }, [majorairlines, countryCode]);

  return (
    <>
      <h2>Associated Airlines</h2>
      {airlines.length === 0 ? (
        <>
          <p>There are no major airlines currently based in this country</p>
        </>
      ) : (
        <>
          <tbody className={styles.airlineList}>
            {airlines.map((airline, index) => (
              <tr key={index}>
                <td>
                  {airline.name && (
                    <a href={airline.Link} className={styles.airportLink}>
                      <p className={styles.airlineLink}>{airline.name}</p>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </>
  );
};
