import useAirportStore from "../../stores/useAirportStore";
import { Link, NavLink } from "react-router-dom";

import styles from "./SearchResultsCity.module.css";

export const SearchResultsCity = () => {
  //need to access airport store to get results of all airports with the municipality
  const { airport, setAirport } = useAirportStore();

  console.log(`in city search results for airports:`, airport);
  // ------formats continent string------//
  const formatContinent = (airportContinent) => {
    switch (airportContinent) {
      case "AS":
        return "Asia";
        break;
      case "OC":
        return "Oceania";
        break;
      case "EU":
        return "Europe";
        break;
      case "AF":
        return "Africa";
        break;
      case "AN":
        return "Antarctica";
        break;
      case "SA":
        return "South America";
        break;
      case "NA":
        return "North America";
        break;
      default:
        //case for error
        return "Continent not found";
        break;
    }
  };

  // ------formats airport type string------//
  const formatType = (airportType) => {
    let sizeNotFormatted = airportType;
    let sizeFormatted = sizeNotFormatted
      .replace(/_/g, " ")
      .replace(/\bairport\b/g, "");

    return sizeFormatted;
  };

  // ----formats country code into name-----//
  const formatCountry = (countryName) => {
    const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
      type: "region",
    });
    return regionNamesInEnglish.of(countryName);
  };

  return (
    <div>
      {airport.length === 0 ? (
        <>
          <p>Sorry, no airports were found for your search.</p>
          <NavLink to="/">
            <p className={styles.homeLink}>Try again</p>
          </NavLink>
        </>
      ) : (
        <>
          <h2>
            We have found {airport.length} airport/s that match your search.
          </h2>
          <p>Click on the airport or country name for further information</p>

          <div className={styles.airportBox}>
            {airport.map((singleAirport, index) => (
              <div key={index} className={styles.airportItem}>
                {singleAirport.name && (
                  <Link to={`/airports/iata/${airport.iata_code}`}>
                    <h2 className={styles.link}> {singleAirport.name}</h2>
                  </Link>
                )}
                <p>
                  City/Area:&nbsp;
                  {(singleAirport.municipality && singleAirport.municipality) ||
                    "N/A"}
                </p>
                <Link to={`/airports/country/${singleAirport.iso_country}`}>
                  <p className={styles.link}>
                    Country: {formatCountry(singleAirport.iso_country)}
                  </p>
                </Link>

                <p> Continent: {formatContinent(singleAirport.continent)}</p>
                <p>Type: {formatType(singleAirport.type)}</p>
                <p>
                  <img
                    className={styles.flag}
                    src={`https://flagsapi.com/${singleAirport.iso_country}/flat/64.png`}
                    alt={`flag of ${formatCountry(singleAirport.iso_country)}`}
                  />
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
