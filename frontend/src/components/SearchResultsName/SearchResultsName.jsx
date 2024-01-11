import { useEffect, useState } from "react";
import useAirportStore from "../../stores/useAirportStore";
import { Link, NavLink } from "react-router-dom";

import styles from "./SearchResultsName.module.css";

export const SearchResultsName = () => {
  //need to access airport store to get results of all airports iwth the name
  const { airport, setAirport } = useAirportStore();

  // ------formats continent string------//
  const formatContinent = (airportContinent) => {
    switch (airportContinent) {
      case "AS":
        return "Asia";
        break;
      case "OC":
        return "Oceania";
        break;
      case "EU":
        return "Europe";
        break;
      case "AF":
        return "Africa";
        break;
      case "AN":
        return "Antarctica";
        break;
      case "SA":
        return "South America";
        break;
      case "NA":
        return "North America";
        break;
      default:
        //case for error
        return "Continent not found";
        break;
    }
  };

  // ------formats airport type string------//
  const formatType = (airportType) => {
    let sizeNotFormatted = airportType;
    let sizeFormatted = sizeNotFormatted
      .replace(/_/g, " ")
      .replace(/\bairport\b/g, "");

    return sizeFormatted;
  };

  // ----formats country code into name-----//
  const formatCountry = (countryName) => {
    const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
      type: "region",
    });
    return regionNamesInEnglish.of(countryName);
  };

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
            We have found {airport.length} airport/s that match your search.
          </h2>
          <p>Click on the airport or country name for further information</p>

          <div className={styles.airportBox}>
            {airport.map((airport, index) => (
              <div key={index} className={styles.airportItem}>
                {airport.name && (
                  <Link to={`/airports/iata/${airport.iata_code}`}>
                    <h2 className={styles.link}> {airport.name}</h2>
                  </Link>
                )}
                <p>City/Area: {airport.municipality && airport.municipality}</p>
                <Link to={`/airports/country/${airport.iso_country}`}>
                  <p className={styles.link}>
                    Country: {formatCountry(airport.iso_country)}
                  </p>
                </Link>

                <p> Continent: {formatContinent(airport.continent)}</p>
                <p>Type: {formatType(airport.type)}</p>
                <p>
                  <img
                    src={`https://flagsapi.com/${airport.iso_country}/flat/64.png`}
                  ></img>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
