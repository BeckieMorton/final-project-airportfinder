import React, { useEffect, useState } from "react";
import styles from "./CountryImage.module.css";
import useAirportStore from "../../stores/useAirportStore";

export const CountryImage = () => {
  const { airport, setAirport } = useAirportStore();
  const [imageToDisplay, setImageToDisplay] = useState(null);

  const query = "Tanzania";

  const apiKey = "2v4JItSSdhRl8LqxjHtgaRy5SFDWSfo48dBeBEeBYu5ug2nRAsfs3DHU";
  const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: apiKey,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data && data.photos && data.photos.length > 0) {
          const photo = data.photos[0];
          console.log(photo);
          console.log("Photo URL:", photo.src.medium);
          setImageToDisplay(photo.src.medium);
        } else {
          console.log("No photos found.");
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchData();
  }, [apiUrl, apiKey]);

  // ----formats country code into name-----//
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  const image = regionNamesInEnglish.of(imageToDisplay);

  return (
    <div>
      <div className={styles.imageBox}>
        {imageToDisplay && <img src={image} alt="Country" />}
      </div>
    </div>
  );
};
