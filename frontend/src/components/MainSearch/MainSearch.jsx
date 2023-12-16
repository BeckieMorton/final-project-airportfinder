import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MainSearch = () => {
  const [airports, setAirports] = useState([]);
  const [code, setCode] = useState("");

  //const myBackendAPI = `mongodb://127.0.0.1:27017/Airportfinder`;

  //WHY AM I DOING THIS FETCH HERE??? I DONT NEED IT. DO I???

  const myAPI = "https://final-project-airportfinder.onrender.com/airports";

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch(myAPI);
        if (!response.ok) {
          throw new Error("Network Response Error");
        }
        const json = await response.json();
        setAirports(json[0]);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchAirports();
  }, []);

  return (
    <div>
      <p style={{ textDecoration: "underline" }}>Enter the airport IATA code</p>
      <input
        type="text"
        placeholder="e.g JRO"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Link to={`/airports/iata/${code}`} key={code}>
        &nbsp;Find Airport
      </Link>
    </div>
  );
};
