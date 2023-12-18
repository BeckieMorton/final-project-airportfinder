import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./MainSearch.module.css";

export const MainSearch = () => {
  const [airports, setAirports] = useState([]);
  const [code, setCode] = useState("");

  //const myBackendAPI = `mongodb://127.0.0.1:27017/Airportfinder`;

  //WHY AM I DOING THIS FETCH HERE??? I DONT NEED IT. DO I???

  const myAPI = "https://final-project-airportfinder.onrender.com/airports";

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch(myAPI);
        if (!response.ok) {
          throw new Error("Network Response Error");
        }
        const json = await response.json();
        setAirports(json[0]);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchAirports();
  }, []);

  return (
    <>
      <div className={styles.mainSearchContainer}>
        <h1 className={styles.searchSlogan}>
          Discover Global Airports Near and Far
        </h1>

        <div className={styles.searchBox}>
          <p>
            <select className={styles.searchSelection}>
              <option disabled selected value="">
                Search by
              </option>
              <option value="1">IATA Code</option>
              <option value="2">Country</option>
              <option disabled value="3">
                City/Area
              </option>
            </select>

            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <Link to={`/airports/iata/${code}`} key={code}>
              <img
                className={styles.searchIcon}
                src="./public/assets/search-icon-orange.png"
              />
            </Link>
          </p>
        </div>
        <div>
          <button className={styles.mobileSelectButton}>City </button>
          <button className={styles.mobileSelectButton}>IATA Code</button>
          <button className={styles.mobileSelectButton}>Country</button>
        </div>
      </div>
    </>
  );
};
