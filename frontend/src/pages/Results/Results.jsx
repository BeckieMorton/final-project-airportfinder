import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Map } from "../../components/Map/Map";
import styles from "./Results.module.css";

//My deployed database
//https://final-project-airportfinder.onrender.com

export const Results = () => {
  const { code } = useParams(null);
  const myBackendIataAPI = `https://final-project-airportfinder.onrender.com/airports/iata/${code}`;

  const [airport, setAirport] = useState({});

  useEffect(() => {
    const fetchIataDetails = async () => {
      try {
        const response = await fetch(myBackendIataAPI);
        if (!response.ok) {
          throw new Error("Network Response Error");
        }
        const json = await response.json();
        setAirport(json);
        console.log("Updated airport state:", airport);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchIataDetails();
  }, [code]);

  console.log(`this is in airport SHOULD BE ONE AIRPORT:`, airport);

  const airportName = airport.name;
  const airportCode = airport.iata_code;
  const airportType = airport.type;
  const airportContinent = airport.continent;
  const airportCountry = airport.iso_country;
  const municipality = airport.municipality;
  const latitude = airport.latitude_deg;
  const longitude = airport.longitude_deg;

  console.log(`country is:`, airportCountry);
  console.log(`latitude is:`, latitude);
  return (
    <>
      <div className={styles.resultsContainer}>
        <div className={styles.resultsBox}>
          <h1>{airportName}</h1>
          <h2>Code: {airportCode}</h2>
          <h2>Type: {airportType}</h2>
          <h2>Continent: {airportContinent}</h2>
          <h2>Country: {airportCountry}</h2>
          <h2>Municipality: {municipality}</h2>
          <h2>Lat: {latitude}</h2>
          <h2>Long: {longitude}</h2>
        </div>
        <div className={styles.resultsBox}>
          <Map />
        </div>
      </div>
    </>
  );
};
