import { Link } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import useCountryStore from "../../stores/useCountryStore";
import { LottieComponent } from "../LottieComponent/LottieComponent";

import styles from "./SearchResultsCountry.module.css";

export const SearchResultsCountry = () => {
  const { country } = useCountryStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(11);

  //need to write code here to order the country array into type largest, medium, small HERE

  //get current posts for pagination feature
  const indexOfLastAirport = currentPage * postsPerPage;
  const indexOfFirstAirport = indexOfLastAirport - postsPerPage;
  const currentAirports = country.slice(
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
      <h2>We have found {country.length} airports. </h2>

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
        <tbody>
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

              <td>{airport.municipality && <p>{airport.municipality}</p>}</td>
              <td>
                {airport.type && <p>{formatAirportSize(airport.type)}</p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};
