// ----- decided to remove this feature as it did not look good -----//
// ----- keeping the component for future use if I want to try the pexel API in further projects ---//

// import React, { useEffect, useState } from "react";
// import useAirportStore from "../../stores/useAirportStore";

// import styles from "./CountryImage.module.css";

// export const CountryImage = () => {
//   const { airport, setAirport } = useAirportStore();
//   const [imageToDisplay, setImageToDisplay] = useState("");
//   const [countryName, setCountryName] = useState("");

//   useEffect(() => {
//     //----formats country code into name to be passed in fetch to return images-----//
//     const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
//       type: "region",
//     });
//     setCountryName(regionNamesInEnglish.of(airport.iso_country));

//     const apiKey = "2v4JItSSdhRl8LqxjHtgaRy5SFDWSfo48dBeBEeBYu5ug2nRAsfs3DHU";
//     const apiUrl = `https://api.pexels.com/v1/search?query=${countryName}&per_page=1`;

//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             Authorization: apiKey,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();

//         if (data && data.photos && data.photos.length > 0) {
//           const photo = data.photos[0];
//           console.log(photo);
//           console.log("Photo URL:", photo.src.medium);
//           setImageToDisplay(photo.src.medium);
//         } else {
//           console.log("No photos found.");
//         }
//       } catch (error) {
//         console.error("Error fetching photos:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div className={styles.imageBox}>
//         {imageToDisplay && <img src={imageToDisplay} alt="Country" />}
//       </div>
//     </div>
//   );
// };
