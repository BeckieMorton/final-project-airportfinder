import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAirportStore from "../../stores/useAirportStore";

import { SearchResultsIata } from "../../components/SearchResultsIata/SearchResultsIata";
import { MapIata } from "../../components/MapIata/MapIata";
import { Weather } from "../../components/Weather/Weather";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { CountryImage } from "../../components/CountryImage/CountryImage";

import styles from "./ResultsIata.module.css";

//My deployed database
//https://final-project-airportfinder.onrender.com

export const ResultsIata = () => {
  //----Function to fetch airport data BEFORE results and relevant components render--IMPORTANT--->

  const { code } = useParams(null);
  const myAPI = `https://final-project-airportfinder.onrender.com/airports/iata/${code}`;

  const { airport, setAirport } = useAirportStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIataDetails = async () => {
      try {
        const response = await fetch(myAPI);
        if (!response.ok) {
          throw new Error("Network Response Error");
        }
        const json = await response.json();
        setAirport(json);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIataDetails();
  }, [code, setAirport, myAPI]);

  if (loading || !airport) {
    return <div>loading data</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.resultsContainer}>
        <div className={styles.resultsBox}>
          <SearchResultsIata />
        </div>
        <div className={styles.resultsBox}>
          <Weather />
        </div>
        <div className={styles.resultsBox}>
          <MapIata />
        </div>
        <div className={styles.resultsBox}>{/* <CountryImage /> */}</div>
        <div className={styles.resultsBox}>info about country?</div>
        <div className={styles.resultsBox}>
          info about closer airports for user. use ipapi api see folder
        </div>
      </div>
      <Footer />
    </>
  );
};
