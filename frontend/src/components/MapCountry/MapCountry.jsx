import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import styles from "./MapCountry.module.css";

//component function Map
export const MapCountry = ({ country }) => {
  console.log(`this is country data passed by props to map:`, country);

  const [loading, setLoading] = useState(true);
  const [capitalCityLat, setCapitalCityLat] = useState("");
  const [capitalCityLong, setCapitalCityLong] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (country) {
      setCapitalCityLat(country[0].capitalInfo.latlng[0]);
      setCapitalCityLong(country[0].capitalInfo.latlng[1]);
      setName(country[0].name.common);
      setLoading(false);
    }
  }, [country]);

  if (loading) {
    return <div>loading data</div>;
  }

  return (
    <div className={styles.mapBox}>
      <MapContainer
        className={styles.map}
        center={[capitalCityLat, capitalCityLong]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[capitalCityLat, capitalCityLong]}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
