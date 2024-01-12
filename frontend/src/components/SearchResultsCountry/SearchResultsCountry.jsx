import { Link } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import useCountryStore from "../../stores/useCountryStore";

import styles from "./SearchResultsCountry.module.css";

export const SearchResultsCountry = () => {
  const { country } = useCountryStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(11);

  //-----sort the country array by type largest, medium, small ----//
  const sortedCountry = [...country].sort((airportA, airportB) => {
    const typeOrder = {
      large_airport: 1,
      medium_airport: 2,
      small_airport: 3,
    };

    const typeA = airportA.type || "";
    const typeB = airportB.type || "";

    // Check if type is in the predefined order
    if (typeOrder[typeA] !== undefined && typeOrder[typeB] !== undefined) {
      // Compare based on the predefined order
      return typeOrder[typeA] - typeOrder[typeB];
    } else {
      // If types are not in the predefined order
      if (typeA === "large_airport") {
        return -1; // prioritize large_airport
      } else if (typeB === "large_airport") {
        return 1; // prioritize large_airport
      }

      // Prioritize medium_airport
      if (typeA === "medium_airport") {
        return -1;
      } else if (typeB === "medium_airport") {
        return 1;
      }

      // Prioritize small_airport
      if (typeA === "small_airport") {
        return -1;
      } else if (typeB === "small_airport") {
        return 1;
      }

      // Sort alphabetically for other types
      return typeA.localeCompare(typeB);
    }
  });

  //get current posts for pagination feature
  const indexOfLastAirport = currentPage * postsPerPage;
  const indexOfFirstAirport = indexOfLastAirport - postsPerPage;
  const currentAirports = sortedCountry.slice(
    indexOfFirstAirport,
    indexOfLastAirport
  );

  const pageCount = Math.ceil(country.length / postsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  // ------formats airport type string------//
  const formatAirportSize = (props) => {
    let sizeNotFormatted = props;
    let sizeFormatted = sizeNotFormatted
      .replace(/_/g, " ")
      .replace(/\bairport\b/g, "");

    return sizeFormatted;
  };

  return (
    <div>
      <h2>We have found {sortedCountry.length} airports. </h2>

      <p>
        Click on the name for further information (Page {currentPage} of&nbsp;
        {pageCount}).
      </p>

      <table className={styles.list}>
        <thead>
          <tr>
            <th>Name</th>
            <th>City/Area</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody className={styles.listBox}>
          {currentAirports.map((airport, index) => (
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

              <td>
                {airport.municipality !== undefined &&
                airport.municipality !== "" ? (
                  <p>{airport.municipality}</p>
                ) : (
                  <p>N/A</p>
                )}
              </td>
              <td>
                {airport.type && <p>{formatAirportSize(airport.type)}</p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pageCount > 1 && (
        <div className={styles.paginationBox}>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            previousLabel="< previous"
            nextLabel="next >"
            breakLabel="..."
            renderOnZeroPageCount={null}
            onPageChange={handlePageChange}
            containerClassName={styles.paginationNumbers}
            activeClassName="active"
          />
        </div>
      )}
    </div>
  );
};
