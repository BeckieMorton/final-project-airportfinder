import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCountryStore from "../../stores/useCountryStore";
import { LottieComponent } from "../../LottieComponent/LottieComponent";

import { SearchResultsCountry } from "../../components/SearchResultsCountry/SearchResultsCountry";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { CountryInfo } from "../../components/CountryInfo/CountryInfo";
import { MapCountry } from "../../MapCountry/MapCountry";
import { Airlines } from "../../components/Airlines/Airlines";

import styles from "./ResultsCountry.module.css";

//My deployed database
//https://final-project-airportfinder.onrender.com

export const ResultsCountry = () => {
  //----Function to fetch country data BEFORE results and relevant components render--IMPORTANT--->

  const { country, setCountry } = useCountryStore();
  const [loading, setLoading] = useState(true);
  const { newCountryCode } = useParams();

  const myAPI = `https://final-project-airportfinder.onrender.com/airports/country/${newCountryCode}`;

  useEffect(() => {
    const fetchCountryDetails = async () => {
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
        console.log(country);
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
      <Header />
      <div className={styles.countryContainer}>
        <div className={styles.countryBox}>
          <CountryInfo />
        </div>
        <div className={styles.countryBox}>
          <Airlines />
        </div>
        <div className={styles.countryBox}>
          <SearchResultsCountry />
        </div>
      </div>
      <Footer />
    </>
  );
};
