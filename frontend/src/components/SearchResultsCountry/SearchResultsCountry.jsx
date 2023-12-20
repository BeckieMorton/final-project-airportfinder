import useCountryStore from "../../stores/useCountryStore";

import styles from "./SearchResultsCountry.module.css";

export const SearchResultsCountry = () => {
  const { country, setCountry } = useCountryStore();

  console.log(`country airport to THIS IS THE LIST`, country);

  //need to map the country array out on render

  const nametest = country[0].name;
  // const airportCode = airport?.iata_code;
  // const airportType = airport?.type;
  // const airportRegion = airport?.iso_region;
  // const municipality = airport?.municipality;
  // const homeLink = airport?.home_link;

  return (
    <div>
      <h2>Airport list for - Country</h2>
      <div className={styles.listContainer}>
        {/* first row for headings */}
        <div className={styles.listBox}>
          <p>Name</p>
          <p>{nametest}</p>
        </div>
        <div className={styles.listBox}>
          <p>Region</p>
        </div>
        <div className={styles.listBox}>
          <p>Municipality</p>
        </div>
        <div className={styles.listBox}>
          <p>Type</p>
        </div>
        <div className={styles.listBox}>
          <p>Link</p>
        </div>
        {/* next row to map out data */}
        {/* {airportName && airport.name} */}
        <div className={styles.listBox}>
          <p>working?</p>
        </div>
        <div className={styles.listBox}>
          <p>Region</p>
        </div>
        <div className={styles.listBox}>
          <p>Municipality</p>
        </div>
        <div className={styles.listBox}>
          <p>Type</p>
        </div>
        <div className={styles.listBox}>
          <p>Link</p>
        </div>
      </div>
    </div>
  );
};
