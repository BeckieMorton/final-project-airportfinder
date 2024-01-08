import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapCountry } from "../MapCountry/MapCountry";

import styles from "./CountryInfo.module.css";

export const CountryInfo = () => {
  //info about the country from restcountries.com free API searched using the 2 digit code.
  const { newCountryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState([]);
  const countryAPI = `https://restcountries.com/v3.1/alpha/${newCountryCode}`;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(countryAPI);
        if (!response.ok) {
          throw new Error("Network Response Error");
        }
        const json = await response.json();
        setCountryInfo(json);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryAPI]);

  if (loading) {
    return <div>loading country data</div>;
  }

  //destructure countryInfo to render relevant information
  const officialName = countryInfo[0].name.official;
  const continent = countryInfo[0].continents;
  const capital = countryInfo[0].capital;
  const flag = countryInfo[0].flags.svg;
  const flagAlt = countryInfo[0].flags.alt;

  const language = countryInfo.map((info) => {
    const firstLanguageValue = Object.values(info.languages)[0]; //
    return firstLanguageValue;
  });

  const currency = countryInfo.map((curr) => {
    const firstCurrencyValue = Object.values(curr.currencies)[0]; //
    return firstCurrencyValue.name;
  });

  return (
    <>
      <div>
        <h2>{officialName}</h2>
        <p className={styles.flag}>
          <img src={flag} alt={flagAlt} />
        </p>

        <p>Continent: {continent}</p>
        <p>Capital: {capital}</p>
        <p>Population: {capital}</p>
        <p>Language: {language}</p>
        <p>Currency: {currency}</p>
      </div>
      <div>
        <MapCountry country={countryInfo} />
      </div>
    </>
  );
};
