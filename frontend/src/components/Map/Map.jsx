import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useAirportStore from "../../stores/useAirportStore";
import "leaflet/dist/leaflet.css";
//import useStillLoadingStore from "../../stores/useStillingLoadingStore";
import { useEffect, useState } from "react";
import styles from "./Map.module.css";

// var map = L.map("map").setView([51.505, -0.09], 13);

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// L.marker([78.5, 15.4])
//   .addTo(map)
//   .bindPopup("A pretty CSS popup.<br> Easily customizable.")
//   .openPopup();

//component function Map
export const Map = () => {
  //destructure airport data from Zustand to use lat and long for map
  const { airport, setAirport } = useAirportStore();
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [name, setName] = useState(null);

  //map works but updates only on refresh, need to fix it, look at using useEffect to wrap around all of the use store and definiting variables, and passing through the airport info

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
        zoom={13}
        scrollWheelZoom={false}
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
