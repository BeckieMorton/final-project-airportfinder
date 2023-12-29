import { useEffect, useState } from "react";
import useAirportStore from "../../stores/useAirportStore";
import { Link, NavLink } from "react-router-dom";

import styles from "./SearchResultsName.module.css";

export const SearchResultsName = () => {
  //need to access airport store to get results of all airports iwth the name
  const { airport, setAirport } = useAirportStore();
  const airportContinent = airport?.continent;

  // ------formats continent string------//
  let continent = "";
  switch (airportContinent) {
    case "AS":
      continent = "Asia";
      break;
    case "OC":
      continent = "Oceania";
      break;
    case "EU":
      continent = "Europe";
      break;
    case "AF":
      continent = "Africa";
      break;
    case "AN":
      continent = "Antarctica";
      break;
    case "SA":
      continent = "South America";
      break;
    case "NA":
      continent = "North America";
      break;
    default:
      //case for error
      continent = "Continent not found";
      break;
  }

  return (
    <div>
      {airport.length === 0 ? (
        <>
          <p>Sorry, no airports were found for your search.</p>
          <NavLink to="/">
            <p className={styles.homeLink}>Search again</p>
          </NavLink>
        </>
      ) : (
        <>
          <h2>
            We have found {airport.length} airports that match your search.
          </h2>
          <p>Click on the airport name for further information</p>

          <div className={styles.airportBox}>
            {airport.map((airport, index) => (
              <div key={index} className={styles.airportItem}>
                {airport.name && (
                  <Link to={`/airports/iata/${airport.iata_code}`}>
                    <h2 className={styles.airportLink}> {airport.name}</h2>
                  </Link>
                )}
                <p>City/Area: {airport.municipality && airport.municipality}</p>
                <p> Country: {airport.iso_country && airport.iso_country}</p>
                <p> Continent: {continent && continent}</p>
                <p>Type: {airport.type && airport.type}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
