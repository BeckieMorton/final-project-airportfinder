import { useEffect, useState } from "react";
import styles from "./MainSearch.module.css";
import { useNavigate } from "react-router-dom";

export const MainSearch = () => {
  const [code, setCode] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [validateMessage, setValidateMessage] = useState("");
  const [countryArray, setCountryArray] = useState("");
  const [newCountryCode, setNewCountryCode] = useState("");
  const [test, setTest] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //use effect to populate countryArray with json data to validate the user input for searching by country name
  //this works
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/src/components/data/countrycodes.json");
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
    return <div>Loading...</div>;
  }

  //validate the user input so it can be correctly used by react router link
  const handleButtonClick = (event) => {
    switch (searchOption) {
      case "1":
        //validate iata code
        if (code.length === 3) {
          navigate(`/airports/iata/${code}`);
        } else {
          setValidateMessage(
            "Invalid IATA code. An International Air Transport Association Code consists of 3 letters, try again."
          );
          event.preventDefault();
          setCode("");
        }
        break;
      case "2":
        if (
          !loading &&
          newCountryCode !== undefined &&
          newCountryCode.length === 2
        ) {
          console.log(`code for option 2:`, newCountryCode); //this is correct
          setTest(newCountryCode);
          console.log(
            "Value of newCountryCode before navigation:",
            newCountryCode
          );
          navigate(`/airports/country/${newCountryCode}`);
          console.log(`/airports/country/${newCountryCode}`);
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
          <p>
            <select
              className={styles.searchSelection}
              value={searchOption}
              onChange={(event) => setSearchOption(event.target.value)}
            >
              <option selected disabled value="">
                Search by
              </option>
              <option value="1">IATA Code</option>
              <option value="2">Country</option>
              <option value="3">City/Area</option>
            </select>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleButtonClick} className={styles.searchButton}>
              <img
                className={styles.searchIcon}
                src="./assets/search-icon-orange.png"
                alt="Search"
              />
            </button>
          </p>
        </div>
        <div className={styles.validateMessage}>{validateMessage}</div>
        <div className={styles.mobileSelection}>
          add mobile view section options here
        </div>
      </div>
    </>
  );
};
