import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useAirportStore from "../../stores/useAirportStore";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import styles from "./MapIata.module.css";

//component function Map
export const MapIata = () => {
  //destructure airport data from Zustand to use lat and long for map
  const { airport, setAirport } = useAirportStore();
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    if (airport && airport.latitude_deg && airport.longitude_deg) {
      setLatitude(airport.latitude_deg);
      setLongitude(airport.longitude_deg);
      setName(airport.name);
      setLoading(false);
    }
  }, [airport]);

  if (loading) {
    return <div>loading data</div>;
  }

  return (
    <div className={styles.mapBox}>
      <MapContainer
        className={styles.map}
        center={[latitude, longitude]}
        zoom={10}
        scrollWheelZoom={true}
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
