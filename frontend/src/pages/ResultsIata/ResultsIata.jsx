import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAirportStore from "../../stores/useAirportStore";
import { LottieComponent } from "../../LottieComponent/LottieComponent";

import { SearchResultsIata } from "../../components/SearchResultsIata/SearchResultsIata";
import { MapIata } from "../../components/MapIata/MapIata";
import { Weather } from "../../components/Weather/Weather";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { CountryImage } from "../../components/CountryImage/CountryImage";

import styles from "./ResultsIata.module.css";
import { Distance } from "../../components/Distance/Distance";
import { NearbyAirports } from "../../NearbyAirports/NearbyAirports";

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
    return (
      <div>
        <LottieComponent />
      </div>
    );
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.resultsContainer1}>
          {/* 1st row */}
          <div className={styles.resultsBox}>
            <SearchResultsIata />
          </div>
          <div className={styles.resultsBox}>
            <Weather />
          </div>
          <div className={styles.resultsBox}>
            <MapIata />
          </div>
        </div>
        {/* 2nd row */}
        <div className={styles.resultsContainer2}>
          <div className={styles.resultsBoxSecond}>
            long box spaning 100% with distance data closest airport to you.
          </div>
        </div>
        {/* 3rd row */}
        <div className={styles.resultsContainer3}>
          <div className={styles.resultsBoxSecond}>
            {/* <Distance />5 largest airports in country */}
          </div>
          <div className={styles.resultsBoxSecond}>
            5 closest airports to user
          </div>
          <div className={styles.resultsBoxSecond}>
            <NearbyAirports />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
