import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCountryStore from "../../stores/useCountryStore";
// import busiestairports from "../../data/busiestairports.json";

import styles from "./BusyAirports.module.css";

export const BusyAirports = () => {
  const { country } = useCountryStore();
  const [busyAirports, setBusyAirports] = useState([]);
  const [contFullName, setContFullName] = useState("");

  //-- Function to fetch busy airport data from backend busiestairportsRoutes UPDATED 17/01/24 --//
  useEffect(() => {
    const fetchBusyAirports = async () => {
      try {
        const continent = country[0]?.continent;

        if (continent) {
          const myBusyairportsAPI = `https://final-project-airportfinder.onrender.com/busiestairports/continent/${continent}`;
          const response = await fetch(myBusyairportsAPI);

          if (!response.ok) {
            throw new Error("Network Response Error");
          }

          const json = await response.json();
          setBusyAirports(json);
          setContFullName(json.length > 0 ? json[0].continent_name : "");
        }
      } catch (error) {
        console.log("Error fetching busy airport data:", error);
      }
    };

    fetchBusyAirports();
  }, [country, setBusyAirports, setContFullName]);

  useEffect(() => {
    if (busyAirports.length !== 0) {
      setContFullName(busyAirports[0].continent_name);
    }
  }, [busyAirports]);

  //-- OLD METHOD to get data from json in frontend ---//
  // useEffect(() => {
  //   setBusyAirports(
  //     busiestairports.filter(
  //       (airport) => airport.continent === countryContinent
  //     )
  //   );
  // }, [busiestairports, countryContinent]);

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
                      <Link
                        className={styles.links}
                        to={`/airports/iata/${place.iata}`}
                      >
                        {place.name}
                      </Link>
                    </p>
                  </td>
                  <td>
                    <p>{place.city}</p>
                  </td>
                  <td>
                    <Link
                      className={styles.links}
                      to={`/airports/country/${place.country_code}`}
                    >
                      {place.country || "N/A"}
                    </Link>
                  </td>
                  <td>
                    <a
                      href={place.Link}
                      className={styles.links}
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
