import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./CountryInfo.module.css";

export const CountryInfo = () => {
  const { newCountryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const countryAPI = `https://restcountries.com/v3.1/alpha/${newCountryCode}`;

  useEffect(() => {
    const fetchCountry = async () => {
      //get info about country from restcountries.com free API searched using the 2 digit code.
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
  const population = countryInfo[0].population;

  //get first two official languages
  const language = countryInfo.map((info) => {
    const languageValues = Object.values(info.languages);
    const firstTwoLanguages = languageValues.slice(0, 2);
    return firstTwoLanguages;
  });

  //get first currency value
  const currency = countryInfo.map((curr) => {
    const firstCurrencyValue = Object.values(curr.currencies)[0]; //
    return firstCurrencyValue.name;
  });

  //format population with commas to make it readable
  const formatPopulation = (population) => {
    return population.toLocaleString();
  };

  return (
    <>
      <div>
        <h2>{officialName}</h2>
        <p className={styles.flag}>
          <img src={flag} alt={flagAlt} />
        </p>
        <p>Continent: {continent}</p>
        <p>Capital: {capital}</p>
        <p>Population: {formatPopulation(population)}</p>
        <p>
          Language/s:&nbsp;
          {language.map((innerArray) => innerArray.join(", ")).join(", ")}
        </p>

        <p>Currency: {currency}</p>
      </div>
    </>
  );
};
