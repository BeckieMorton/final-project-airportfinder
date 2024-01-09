import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import busiestairports from "../../data/busiestairports.json";
import useCountryStore from "../../stores/useCountryStore";

import styles from "./BusyAirports.module.css";

export const BusyAirports = () => {
  const { country, setCountry } = useCountryStore();
  const [busyAirports, setBusyAirports] = useState([]);
  const [countryContinent, setCountryContinent] = useState("");
  const [contFullName, setContFullName] = useState("");

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

  useEffect(() => {
    if (busyAirports.length !== 0) {
      setContFullName(busyAirports[0].continent_name);
    }
  }, [busyAirports]);

  console.log(`what is in countryContinent?:`, countryContinent);
  console.log(`what is is setContFullName`, contFullName);
  return (
    <>
      <h2>Busiest Airports in {contFullName}</h2>
      {busyAirports.length === 0 ? (
        <>
          <p>There are no major airlines currently based in this country</p>
        </>
      ) : (
        <>
          <table className={styles.list}>
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Country</th>
                <th>Homepage</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {busyAirports.slice(0, 5).map((place, index) => (
                <tr key={index}>
                  <td>
                    <p>
                      {place.name && (
                        <Link
                          className={styles.airportLink}
                          to={`/airports/iata/${place.iata}`}
                        >
                          {place.name}
                        </Link>
                      )}
                    </p>
                  </td>
                  <td>
                    <p>{place.city}</p>
                  </td>
                  <td>
                    <p>{place.country}</p>
                  </td>
                  <td>
                    <a
                      href={place.Link}
                      className={styles.airportLink}
                      target="_blank"
                      key={place.name}
                      rel="noreferrer noopener"
                    >
                      Official site
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
