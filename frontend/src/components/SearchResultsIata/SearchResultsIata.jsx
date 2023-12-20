import useAirportStore from "../../stores/useAirportStore";

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
        <h2>Continent: {continent}</h2>
        <h2>Country: {countryToDisplay}</h2>
        <h2>Municipality: {municipality}</h2>
        <h2>IATA Code: {airportCode}</h2>
        <h2>Type: {size}</h2>
        <img src={`https://flagsapi.com/${flag}/flat/64.png`}></img>
      </div>
    </>
  );
};
