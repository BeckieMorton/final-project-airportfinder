import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAirportStore from "../../stores/useAirportStore";
import { LottieComponent } from "../../components/LottieComponent/LottieComponent";
import { ResultsHeader } from "../../components/ResultsHeader/ResultsHeader";
import { Footer } from "../../components/Footer/Footer";
import { SearchResultsName } from "../../components/SearchResultsName/SearchResultsName";

import styles from "./ResultsName.module.css";

export const ResultsName = () => {
  //----Function to fetch airport data BEFORE results and relevant components render--IMPORTANT--->

  const { code } = useParams(null);
  //my endpoint is "/airports/name/:name"
  const myAPI = `https://final-project-airportfinder.onrender.com/airports/name/${code}`;

  const { airport, setAirport } = useAirportStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNameDetails = async () => {
      try {
        const response = await fetch(myAPI);
        if (!response.ok) {
          throw new Error("Network Response Error");
        }
        const json = await response.json();
        setAirport(json);
      } catch (error) {
        console.log("Error fetching name data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNameDetails();
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
      <ResultsHeader />
      <div className={styles.nameContainer}>
        <div className={styles.nameBox}>
          <SearchResultsName />
        </div>
      </div>
      <Footer cameFrom="name" />
    </>
  );
};
