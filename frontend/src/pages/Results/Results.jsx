import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Map } from "../../components/Map/Map";
import { SearchResults } from "../../components/SearchResults/SearchResults";
import { Weather } from "../../components/Weather/Weather";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { CountryImage } from "../../components/CountryImage/CountryImage";

import styles from "./Results.module.css";

//My deployed database
//https://final-project-airportfinder.onrender.com

//expressAPIrender - other airport file
//https://project-express-api-hcmb.onrender.com

export const Results = () => {
  return (
    <>
      <Header />
      <div className={styles.resultsContainer}>
        <div className={styles.resultsBox}>
          <SearchResults />
        </div>
        <div className={styles.resultsBox}>
          <Weather />
        </div>
        <div className={styles.resultsBox}>
          <Map />
        </div>
        <div className={styles.resultsBox}>
          <CountryImage />
        </div>
        <div className={styles.resultsBox}>info about country?</div>
        <div className={styles.resultsBox}>
          info about closer airports for user
        </div>
      </div>
      <Footer />
    </>
  );
};
