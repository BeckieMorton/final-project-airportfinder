import useCountryStore from "../../stores/useCountryStore";
import { Link } from "react-router-dom";

import styles from "./SearchResultsCountry.module.css";

export const SearchResultsCountry = () => {
  const { country, setCountry } = useCountryStore();

  //want to sort results from small to large airports. add code here

  return (
    <div>
      <h2>We have found {country.length} airports. </h2>
      <p>Click on the name for further information</p>

      <table className={styles.list}>
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Region</th> */}
            <th>Municipality</th>
            <th>Type</th>
            {/* <th>Homepage</th> */}
          </tr>
        </thead>
        <tbody>
          {country.map((country, index) => (
            <tr key={index}>
              <td>
                {country.name && (
                  <Link
                    className={styles.airportLink}
                    to={`/airports/iata/${country.iata_code}`}
                  >
                    {country.name}
                  </Link>
                )}
              </td>

              {/* <td>{country.region && <p>{country.region}</p>}</td> */}
              <td>{country.municipality && <p>{country.municipality}</p>}</td>
              <td>{country.type && <p>{country.type}</p>}</td>
              {/* <td>{country.link && <p>{country.link}</p>}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
