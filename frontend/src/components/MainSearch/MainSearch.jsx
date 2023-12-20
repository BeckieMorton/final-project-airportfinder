import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./MainSearch.module.css";
import useAirportStore from "../../stores/useAirportStore";

export const MainSearch = () => {
  const { airport, setAirport } = useAirportStore();
  const [code, setCode] = useState("");
  const [searchOption, setSearchOption] = useState("");

  console.log(`search option:`, searchOption);

  //NEED TO CLEAR THE AIRPORT STORE TO START A NEW SEARCH HERE

  return (
    <>
      <div className={styles.mainSearchContainer}>
        <h1 className={styles.searchSlogan}>
          Discover Global Airports Near and Far
        </h1>

        <div className={styles.searchBox}>
          <p>
            <select
              className={styles.searchSelection}
              value={searchOption}
              onChange={(event) => setSearchOption(event.target.value)}
            >
              <option selected disabled value="">
                Search by
              </option>
              <option value="1">IATA Code</option>
              <option value="2">Country</option>
              <option value="3">City/Area</option>
            </select>

            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Link
              to={
                searchOption === "1"
                  ? `/airports/iata/${code}`
                  : searchOption === "2"
                  ? `/airports/country/${code}`
                  : searchOption === "3"
                  ? `/airports/city/${code}`
                  : "/"
              }
            >
              <button className={styles.searchButton}>
                <img
                  className={styles.searchIcon}
                  src="./assets/search-icon-orange.png"
                  alt="Search"
                />
              </button>
            </Link>
          </p>
        </div>
        <div className={styles.mobileSelection}>
          add mobile view section options here
        </div>
      </div>
    </>
  );
};
