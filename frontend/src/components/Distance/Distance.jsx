import { useEffect, useState } from "react";
import styles from "./Distance.module.css";

//using Lufthansa Developer Center API to find nearest airports to the user

//My Lufthansa API key: w6wtw5xph6gayfqy6vqdrdgh8

export const Distance = () => {
  //lat and long of berlin
  const testlat = "52.52";
  const testlong = "13.40";
  //find users ip address

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const apiUrl = "https://api.lufthansa.com/v1/oauth/token";
      const clientId = "w6wtw5xph6gayfqy6vqdrdgh8";
      const clientSecret = "3p6tzwart8";

      const data = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      };

      try {
        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        console.log("Token:", responseData.access_token);
        setAccessToken(responseData.access_token);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchAccessToken();
  }, []); // Run only once on component mount

  useEffect(() => {
    // Step 2: Fetching data using access token
    const fetchData = async () => {
      if (!accessToken) {
        console.log(`access token not going through`);
        return;
      }

      const apiUrl =
        "https://api.lufthansa.com/v1/mds-references/airports/nearest/-33,151?lang=en";

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      };

      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response:", data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    };
    fetchData();
  }, [accessToken]); // Run when access token changes
  return <div>Distance</div>;
};
