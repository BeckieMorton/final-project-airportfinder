import { useState, useEffect } from "react";
import majorairlines from "../data/majorairlines.json";
import useAirportStore from "../../stores/useAirportStore";

import styles from "./Airlines.module.css";

export const Airlines = () => {
  const { airport, setAirport } = useAirportStore();
  const [countryCode, setCountryCode] = useState("");
  const [airlines, setAirlines] = useState("");

  //use json airline data to find matches for all the airlines that have the same country code

  useEffect(() => {
    //get country code from airport store
    setCountryCode(airport?.iso_country);

    // Filter major airlines based on the country code
    setAirlines(
      majorairlines.filter((airline) => airline.country_code === countryCode)
    );
    // Do something with the filtered airlines if needed
    console.log(`these are the airlines to display!:`, airlines);
  }, [majorairlines, countryCode]);

  return (
    <>
      <h2>Associated Airlines</h2>
      {airlines.length === 0 ? (
        <>
          <p>No major airlines linked to this country</p>
        </>
      ) : (
        <>
          <tbody className={styles.airlineList}>
            {airlines.map((airline, index) => (
              <tr key={index}>
                <td>
                  {airline.name && (
                    <a href="{airline.Link}" className={styles.airportLink}>
                      {airline.name}{" "}
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
