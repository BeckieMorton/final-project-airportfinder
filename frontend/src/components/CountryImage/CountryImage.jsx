import React, { useEffect, useState } from "react";

export const CountryImage = () => {
  const apiKey = "2v4JItSSdhRl8LqxjHtgaRy5SFDWSfo48dBeBEeBYu5ug2nRAsfs3DHU";
  const query = "Tanzania";
  const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;

  const [imageToDisplay, setImageToDisplay] = useState(null);

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
          console.log("Photo URL:", photo.src.small);
          setImageToDisplay(photo.src.small);
        } else {
          console.log("No photos found.");
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchData();
  }, [apiUrl, apiKey]);

  console.log("image to display", imageToDisplay);

  return (
    <div>
      <h2>CountryImage</h2>
      {imageToDisplay && <img src={imageToDisplay} alt="Country" />}
    </div>
  );
};
