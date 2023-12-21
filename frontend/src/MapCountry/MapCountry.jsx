import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import styles from "./MapCountry.module.css";

//component function Map
export const MapCountry = ({ country }) => {
  console.log(`this is country data passed by props to map:`, country);

  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");

  //country[0].capitalInfo.latlng[0] = latitude of the capital city

  //country[0].capitalInfo.latlng[1] = longitude of the capital city

  const lat = country[0].capitalInfo.latlng[0];

  const long = country[0].capitalInfo.latlng[1];

  useEffect(() => {
    if (country) {
      setLatitude(country[0].capitalInfo.latlng[0]);
      setLongitude(country[0].capitalInfo.latlng[1]);
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
        center={[latitude, longitude]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
