import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCountryStore from "../../stores/useCountryStore";
import { LottieComponent } from "../../components/LottieComponent/LottieComponent";
import { ResultsHeader } from "../../components/ResultsHeader/ResultsHeader";
import { Footer } from "../../components/Footer/Footer";
import { CountryInfo } from "../../components/CountryInfo/CountryInfo";
import { SearchResultsCountry } from "../../components/SearchResultsCountry/SearchResultsCountry";
import { BusyAirports } from "../../components/BusyAirports/BusyAirports";

import { AirlinesCountry } from "../../components/AirlinesCountry/AirlinesCountry";

import styles from "./ResultsCountry.module.css";

//My deployed database
//https://final-project-airportfinder.onrender.com

export const ResultsCountry = () => {
  const { country, setCountry } = useCountryStore();
  const [loading, setLoading] = useState(true);
  const { newCountryCode } = useParams();
  const countryFooter = "country";

  const myAPI = `https://final-project-airportfinder.onrender.com/airports/country/${newCountryCode}`;

  useEffect(() => {
    const fetchCountryDetails = async () => {
      //----Function to fetch country data BEFORE results and relevant components render--IMPORTANT--->
      try {
        if (!newCountryCode) {
          console.log("newCountryCode is undefined");
          return;
        }

        const response = await fetch(myAPI);
        if (!response.ok) {
          throw new Error("Network Response Error");
        }
        const json = await response.json();
        setCountry(json);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [newCountryCode, setCountry, myAPI]);

  if (loading || !country || !newCountryCode) {
    return (
      <div>
        <LottieComponent />
      </div>
    );
  }

  return (
    <>
      <ResultsHeader />
      <div className={styles.countryContainer}>
        <div className={styles.countryBox}>
          <AirlinesCountry />
        </div>
        <div className={styles.countryBox}>
          <CountryInfo />
        </div>
        <div className={styles.countryBox}>
          <SearchResultsCountry />
        </div>
        <div className={styles.countryBox}>
          <BusyAirports />
        </div>
      </div>
      <Footer camefrom={countryFooter} />
    </>
  );
};
