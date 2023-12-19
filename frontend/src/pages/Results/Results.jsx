import { useEffect, useState } from "react";
import { Map } from "../../components/Map/Map";
import { SearchResults } from "../../components/SearchResults/SearchResults";
import { Weather } from "../../components/Weather/Weather";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { CountryImage } from "../../components/CountryImage/CountryImage";
import useAirportStore from "../../stores/useAirportStore";
import { useParams } from "react-router-dom";

import styles from "./Results.module.css";

//My deployed database
//https://final-project-airportfinder.onrender.com

//expressAPIrender - other airport file
//https://project-express-api-hcmb.onrender.com

export const Results = () => {
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
          <SearchResults />
        </div>
        <div className={styles.resultsBox}>
          <Weather />
        </div>
        <div className={styles.resultsBox}>
          <Map />
        </div>
        <div className={styles.resultsBox}>{/* <CountryImage /> */}</div>
        <div className={styles.resultsBox}>info about country?</div>
        <div className={styles.resultsBox}>
          info about closer airports for user
        </div>
      </div>
      <Footer />
    </>
  );
};
