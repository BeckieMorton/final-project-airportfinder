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
    <div className={styles.mainSearchContainer}>
      <div>
        <h1>Discover Global Airports Near and Far.</h1>
      </div>

      <p>Enter the airport IATA code</p>
      <div className={styles.searchBox}>
        <p>
          <input
            type="text"
            placeholder="e.g JRO"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Link to={`/airports/iata/${code}`} key={code}>
            <img src="./public/assets/search-icon-orange.png" />
          </Link>
        </p>
        <p>test</p>
        <p>test2</p>
      </div>
    </div>
  );
};
