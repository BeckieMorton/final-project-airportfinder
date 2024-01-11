import { useState, useEffect } from "react";
import majorairlines from "../../data/majorairlines.json";
import useCountryStore from "../../stores/useCountryStore";

import styles from "./AirlinesCountry.module.css";

export const AirlinesCountry = () => {
  //get country from country store (if coming from Country search)
  const { country, setCountry } = useCountryStore();
  const [countryCode, setCountryCode] = useState("");
  const [airlines, setAirlines] = useState([]);

  //get country code from country store (store was populated in previous component - ResultsCountry)
  useEffect(() => {
    console.log(`in airlines json`, majorairlines);

    // Set country code
    const countryIsoCode = country[0].iso_country;
    setCountryCode(countryIsoCode);

    // Run subsequent logic only if countryIsoCode is defined
    if (countryIsoCode) {
      setAirlines(
        majorairlines.filter(
          (airline) => airline.country_code === countryIsoCode
        )
      );
    }
  }, [majorairlines, country]);

  useEffect(() => {
    console.log("Updated countryCode:", countryCode);
  }, [countryCode]);

  useEffect(() => {
    console.log("Updated airlines:", airlines);
  }, [airlines]);

  // useEffect(() => {
  //   // Filter major airlines based on the country code
  //   console.log(countryCode);
  //   if (countryCode) {
  //     setAirlines(
  //       majorairlines.filter((airline) => airline.country_code === countryCode)
  //     );
  //   } else {
  //     console.log(`didnt work`);
  //   }
  // }, [majorairlines, countryCode]);

  return (
    <>
      <h2>Associated Airlines</h2>

      {airlines.length === 0 ? (
        <>
          <p>Test are no major airlines currently based in this country</p>
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
