import { useEffect, useState } from "react";
import styles from "./MainSearch.module.css";
import { useNavigate } from "react-router-dom";
import { LottieComponent } from "../../components/LottieComponent/LottieComponent";

export const MainSearch = () => {
  const [code, setCode] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [validateMessage, setValidateMessage] = useState("");
  const [countryArray, setCountryArray] = useState("");
  const [newCountryCode, setNewCountryCode] = useState("");
  const [test, setTest] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //----HANDLE NAME SEARCH VALIDATION-----//
  const myAPI = `https://final-project-airportfinder.onrender.com/airports/iata/${code}`;

  //-----HANDLE COUNTRY SEARCH VALIDATION----//
  //use effect to populate countryArray with json data to validate the user input for searching by country name
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data/countrycodes.json");
        const data = await response.json();
        setCountryArray(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching json file", error);
      }
    };

    if (countryArray.length > 0 && code) {
      const foundCountry = countryArray.find(
        (country) => country.name.toLowerCase() === code.toLowerCase()
      );

      if (foundCountry) {
        console.log("Country found:", foundCountry);
        const realname = foundCountry.twocode;
        // setCode(realname);
        setNewCountryCode(realname);
      } else {
        console.log("Country not found");
      }
    }

    fetchData();
  }, [code]);

  //to make sure countryArray is populated before mapping it and using it to convert user input into a country code
  if (!countryArray) {
    return (
      <div>
        <LottieComponent />
      </div>
    );
  }

  //validate the user input so it can be correctly used by react router link
  const handleButtonClick = (event) => {
    switch (searchOption) {
      case "0": //name search
        navigate(`/airports/name/${code}`);
        break;
      case "1": //iata search
        if (code.length === 3) {
          navigate(`/airports/iata/${code}`);
        } else {
          setValidateMessage(
            <>
              Invalid IATA code. An International Air Transport Association Code
              consists of 3 letters. Not sure what an IATA code is? Check it out
              here:{" "}
              <a
                href="https://www.iata.org/en/services/codes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.iata.org/en/services/codes/
              </a>
            </>
          );
          event.preventDefault();
          setCode("");
        }
        break;
      case "2": //country search
        if (
          !loading &&
          newCountryCode !== undefined &&
          newCountryCode.length === 2
        ) {
          setTest(newCountryCode);
          navigate(`/airports/country/${newCountryCode}`);
        } else {
          if (loading) {
            console.log("data is loading...");
          } else {
            setValidateMessage(
              "We are having trouble validating your country, please check your spelling and try again"
            );
            event.preventDefault();
            setCode("");
          }
        }
        break;
      case "": //user hasnt selected a search by option yet
        setValidateMessage("Please choose a 'Search by' option and try again");

        break;
      default:
        //case for error
        continent = "Option is not valid";
        break;
    }
  };

  return (
    <>
      <div className={styles.mainSearchContainer}>
        <h1 className={styles.searchSlogan}>
          Discover Global Airports Near and Far
        </h1>

        <div className={styles.searchBox}>
          <select
            className={styles.searchSelection}
            value={searchOption}
            onChange={(event) => setSearchOption(event.target.value)}
          >
            <option selected disabled value="">
              Search by
            </option>
            <option value="0">Name</option>
            <option value="1">IATA Code</option>
            <option value="2">Country</option>
          </select>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleButtonClick();
              }
            }}
          />
          <button
            onClick={handleButtonClick}
            className={styles.searchButton}
            onKeyDown={(e) => (e.key === "Enter" ? handleButtonClick : "")}
          >
            <img
              className={styles.searchIcon}
              src="./assets/search-icon-orange.png"
              alt="Search"
            />
          </button>
        </div>
      </div>
      <div className={styles.validateMessage}>{validateMessage}</div>
      <div className={styles.mobileSelection}>
        add mobile view section options here
      </div>
    </>
  );
};
