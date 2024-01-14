import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAirportStore from "../../stores/useAirportStore";
import { LottieComponent } from "../../components/LottieComponent/LottieComponent";
import { ResultsHeader } from "../../components/ResultsHeader/ResultsHeader";
import { Footer } from "../../components/Footer/Footer";
import { SearchResultsCity } from "../../components/SearchResultsCity/SearchResultsCity";

import styles from "./ResultsCity.module.css";

export const ResultsCity = () => {
  //----Function to fetch airport data BEFORE results and relevant components render--IMPORTANT--->

  const { code } = useParams();

  console.log(`code is:`, code);

  const myAPI = `https://final-project-airportfinder.onrender.com/airports/area/${code}`;

  console.log(myAPI);

  const { airport, setAirport } = useAirportStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) {
      // Handle the case where code is not defined (optional)
      console.error("Code parameter is undefined.");
    }
    const fetchCityDetails = async () => {
      try {
        const response = await fetch(myAPI);
        if (!response.ok) {
          throw new Error("Network Response Error");
        }
        const json = await response.json();
        setAirport(json);
        console.log(`json successful added to airport store for city search`);
      } catch (error) {
        console.log("Error fetching name data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityDetails();
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
      {loading ? (
        <div>
          <LottieComponent />
        </div>
      ) : (
        <>
          <ResultsHeader />
          <div className={styles.nameContainer}>
            <div className={styles.nameBox}>
              <SearchResultsCity />
            </div>
          </div>
          <Footer cameFrom="name" />
        </>
      )}
    </>
  );
};
