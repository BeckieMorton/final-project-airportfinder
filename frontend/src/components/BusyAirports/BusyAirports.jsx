import { useState, useEffect } from "react";
import busiestairports from "../../data/busiestairports.json";
import useCountryStore from "../../stores/useCountryStore";

import styles from "./BusyAirports.module.css";

export const BusyAirports = () => {
  const { country, setCountry } = useCountryStore();
  const [busyAirports, setBusyAirports] = useState([]);
  const [countryContinent, setCountryContinent] = useState("");

  //use json airline data to find matches for all the airlines that have the same country code
  //i have done this differently here than i have to get the country codes in the MainSearch. im not sure why i have and which is better? perhaps using the fetch in MainSearch is better?

  useEffect(() => {
    //OR get country from country store (if coming from Country search)
    console.log(`what is in country?:`, country);
    setCountryContinent(country[0]?.continent);
    // Filter major airlines based on the country code
  }, [country]);

  useEffect(() => {
    setBusyAirports(
      busiestairports.filter(
        (airport) => airport.continent === countryContinent
      )
    );
  }, [busiestairports, countryContinent]);

  console.log(`what is in countryContinent?:`, countryContinent);

  return (
    <>
      <h2>Busiest Airports in {countryContinent}</h2>
      {busyAirports.length === 0 ? (
        <>
          <p>There are no major airlines currently based in this country</p>
        </>
      ) : (
        <>
          <div className={styles.airlineList}>
            {busyAirports.slice(0, 4).map((place, index) => (
              <div key={index}>
                <p>
                  {place.name && (
                    <a href={place.Link} className={styles.airportLink}>
                      {place.name}
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
