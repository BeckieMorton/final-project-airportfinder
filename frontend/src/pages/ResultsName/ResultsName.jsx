import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAirportStore from "../../stores/useAirportStore";
import { LottieComponent } from "../../LottieComponent/LottieComponent";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { SearchResultsName } from "../../components/SearchResultsName/SearchResultsName";

import styles from "./ResultsName.module.css";

export const ResultsName = () => {
  //----Function to fetch airport data BEFORE results and relevant components render--IMPORTANT--->

  const { code } = useParams(null);
  //my endpoint is "/airports/name/:name"
  const myAPI = `https://final-project-airportfinder.onrender.com/airports/name/${code}`;

  console.log(`inside results name and the code is:`, code);

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
      <div className={styles.nameContainer}>
        <Header />
        <div className={styles.resultsBox}>
          <SearchResultsName />
        </div>
        <Footer />
      </div>
    </>
  );
};
