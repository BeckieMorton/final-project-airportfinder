import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import useCountryStore from "../../stores/useCountryStore";

import styles from "./CountryPagination.module.css";

export const CountryPagination = () => {
  const { country } = useCountryStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

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

  //change page
  //   const paginate = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };

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
      <p>Click on the name for further information</p>

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
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        previousLabel="< previous"
        nextLabel="next >"
        breakLabel="..."
        onPageChange={handlePageChange}
        containerClassName={`pagination ${styles.paginationNumbers}`}
        activeClassName="active"
      />
    </div>
  );
};
//   const PaginatedItems = ({ itemsPerPage }) => {
//     const [currentItems, setCurrentItems] = useState(null);
//     const [pageCount, setPageCount] = useState(0);
//     const [itemOffset, setItemOffset] = useState(0);

//     useEffect(() => {
//       const endOffset = itemOffset + itemsPerPage;
//       console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//       setCurrentItems(items.slice(itemOffset, endOffset));
//       setPageCount(Math.ceil(items.length / itemsPerPage));
//     }, [itemOffset, itemsPerPage]);

//     const handlePageClick = (event) => {
//       const newOffset = event.selected * itemsPerPage;
//       console.log(
//         `User requested page number ${event.selected}, which is offset ${newOffset}`
//       );
//       setItemOffset(newOffset);
//     };

//     return (
//       <>
//         <Items currentItems={currentItems} />
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             padding: 20,
//             boxSizing: "border-box",
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <ReactPaginate
//             nextLabel="next >"
//             onPageChange={handlePageClick}
//             pageRangeDisplayed={3}
//             marginPagesDisplayed={2}
//             pageCount={pageCount}
//             previousLabel="< previous"
//             pageClassName="page-item"
//             pageLinkClassName="page-link"
//             previousClassName="page-item"
//             previousLinkClassName="page-link"
//             nextClassName="page-item"
//             nextLinkClassName="page-link"
//             breakLabel="..."
//             breakClassName="page-item"
//             breakLinkClassName="page-link"
//             containerClassName="pagination"
//             activeClassName="active"
//             renderOnZeroPageCount={null}
//           />
//         </div>
//       </>
//     );
//   };

//   return (
//     <div>
//       <h1>Country Pagination</h1>

//       <PaginatedItems itemsPerPage={4} />
//     </div>
//   );
// };

//     <div>
//       <h2>this is the PAGINATION PAGE</h2>
//       <h2>We have found {country.length} airports. </h2>
//       <p>Click on the name for further information</p>

//       <table className={styles.list}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             {/* <th>Region</th> */}
//             <th>City/Area</th>
//             <th>Type</th>
//             {/* <th>Homepage</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {country.map((country, index) => (
//             <tr key={index}>
//               <td>
//                 {country.name && (
//                   <Link
//                     className={styles.airportLink}
//                     to={`/airports/iata/${country.iata_code}`}
//                   >
//                     {country.name}
//                   </Link>
//                 )}
//               </td>

//               {/* <td>{country.region && <p>{country.region}</p>}</td> */}
//               <td>{country.municipality && <p>{country.municipality}</p>}</td>
//               <td>
//                 {country.type && <p>{formatAirportSize(country.type)}</p>}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
