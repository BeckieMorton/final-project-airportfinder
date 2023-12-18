import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Map } from "../../components/Map/Map";

import useAirportStore from "../../stores/useAirportStore";
import styles from "./SearchResults.module.css";

//My deployed database
//https://final-project-airportfinder.onrender.com

//expressAPIrender - other airport file
//https://project-express-api-hcmb.onrender.com

export const SearchResults = () => {
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
        console.log("airport array set with searched airport");
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

  console.log(`value of airport:`, airport);
  const airportName = airport?.name;
  const airportCode = airport?.iata_code;
  const airportType = airport?.type;
  const airportContinent = airport?.continent;
  const airportCountry = airport?.iso_country;
  const municipality = airport?.municipality;
  const flag = airport?.iso_country;

  console.log(`this should be in the airportName:`, airportName);

  //this will show loading while data is being fetch fetched from the API
  if (!airport || !airport.name) {
    return <div>loading data....</div>;
  }

  return (
    <>
      <div>
        <h1>{airportName}</h1>
        <h2>Code: {airportCode}</h2>
        <h2>Type: {airportType}</h2>
        <h2>Continent: {airportContinent}</h2>
        <h2>Country: {airportCountry}</h2>
        <h2>Municipality: {municipality}</h2>
        <img src={`https://flagsapi.com/${flag}/flat/64.png`}></img>
      </div>
    </>
  );
};
