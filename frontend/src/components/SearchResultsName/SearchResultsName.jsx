import { useEffect, useState } from "react";
import useAirportStore from "../../stores/useAirportStore";
import { Link } from "react-router-dom";

import styles from "./SearchResultsName.module.css";

export const SearchResultsName = () => {
  //need to access airport store to get results of all airports iwth the name
  const { airport, setAirport } = useAirportStore();

  //this console log works it shows only results with the word the user searched.
  console.log(`value of airport inside search results name:`, airport);

  const airportNames = airport?.name;
  const airportCodes = airport?.iata_code;
  const airportTypes = airport?.type;
  const airportContinents = airport?.continent;
  const airportCountries = airport?.iso_country;
  const municipalities = airport?.municipality;
  const flags = airport?.iso_country;

  return (
    <div>
      <h2>We have found {airport.length} airports that match your search. </h2>
      <p>Click on the airport name for further information</p>

      <table className={styles.list}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Municipality</th>
            <th>Country</th>
            <th>Continent</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {airport.map((airport, index) => (
            <tr key={index}>
              <td>
                {airport.name && (
                  <Link
                    className={styles.airportLink}
                    to={`/airports/iata/${airport.iata_code}`}
                  >
                    {airport.name}
                  </Link>
                )}
              </td>

              <td>{airport.municipality && <p>{airport.municipality}</p>}</td>
              <td>{airport.iso_country && <p>{airport.iso_country}</p>}</td>
              <td>{airport.continent && <p>{airport.continent}</p>}</td>
              <td>{airport.type && <p>{airport.type}</p>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};