import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Map } from "../../components/Map/Map";
import { SearchResults } from "../../components/SearchResults/SearchResults";
import { Weather } from "../../components/Weather/Weather";

import styles from "./Results.module.css";

//My deployed database
//https://final-project-airportfinder.onrender.com

//expressAPIrender - other airport file
//https://project-express-api-hcmb.onrender.com

export const Results = () => {
  return (
    <>
      <div className={styles.resultsContainer}>
        {/* <div className={styles.resultsBox}>
          <SearchResults />
        </div>
        <div className={styles.resultsBox}>
          <Map />
        </div> */}
        <div className={styles.weatherBox}>
          <Weather />
        </div>
      </div>
    </>
  );
};
