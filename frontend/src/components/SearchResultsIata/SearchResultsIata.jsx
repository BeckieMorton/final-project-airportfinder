import useAirportStore from "../../stores/useAirportStore";
import { Link } from "react-router-dom";

import styles from "./SearchResultsIata.module.css";

export const SearchResultsIata = () => {
  const { airport, setAirport } = useAirportStore();

  console.log(`value of airport:`, airport);
  const airportName = airport?.name;
  const airportCode = airport?.iata_code;
  const airportType = airport?.type;
  const airportContinent = airport?.continent;
  const airportCountry = airport?.iso_country;
  const municipality = airport?.municipality;
  const flag = airport?.iso_country;

  // ------formats airport type string------//
  const formatAirportSize = (props) => {
    let sizeNotFormatted = props;
    let sizeFormatted = sizeNotFormatted
      .replace(/_/g, " ")
      .replace(/\bairport\b/g, "");

    return sizeFormatted;
  };

  const size = formatAirportSize(airportType);

  // ------formats continent string------//
  let continent = "";
  switch (airportContinent) {
    case "AS":
      continent = "Asia";
      break;
    case "OC":
      continent = "Oceania";
      break;
    case "EU":
      continent = "Europe";
      break;
    case "AF":
      continent = "Africa";
      break;
    case "AN":
      continent = "Antarctica";
      break;
    case "SA":
      continent = "South America";
      break;
    case "NA":
      continent = "North America";
      break;
    default:
      //case for error
      continent = "Continent not found";
      break;
  }

  // ----formats country code into name-----//
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  const countryToDisplay = regionNamesInEnglish.of(airportCountry);

  return (
    <>
      <div>
        <h1>{airportName}</h1>
        <table className={styles.detailsTable}>
          <tr>
            <td>
              <h2>Continent:</h2>
            </td>
            <td>
              <h2 style={{ fontWeight: "400" }}>{continent || "N/A"}</h2>
            </td>
          </tr>
          <tr>
            <td>
              <h2>Country:</h2>
            </td>
            <td>
              <Link to={`/airports/country/${airport.iso_country}`}>
                <h2
                  className={styles.countryLink}
                  style={{ fontWeight: "400" }}
                >
                  {countryToDisplay || "N/A"}
                </h2>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <h2>Municipality:</h2>
            </td>
            <td>
              <h2 style={{ fontWeight: "400" }}>{municipality || "N/A"}</h2>
            </td>
          </tr>
          <tr>
            <td>
              <h2>IATA Code:</h2>
            </td>
            <td>
              <h2 style={{ fontWeight: "400" }}>{airportCode || "N/A"}</h2>
            </td>
          </tr>
          <tr>
            <td>
              <h2>Type:</h2>
            </td>
            <td>
              <h2 style={{ fontWeight: "400" }}>{size || "N/A"}</h2>
            </td>
          </tr>
        </table>
        <img src={`https://flagsapi.com/${flag}/flat/64.png`}></img>
      </div>
    </>
  );
};
