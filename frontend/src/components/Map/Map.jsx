import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useAirportStore from "../../stores/useAirportStore";
import "leaflet/dist/leaflet.css";
//import useStillLoadingStore from "../../stores/useStillingLoadingStore";

import styles from "./Map.module.css";
import { useEffect } from "react";

var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([78.5, 15.4])
  .addTo(map)
  .bindPopup("A pretty CSS popup.<br> Easily customizable.")
  .openPopup();

//component function Map
export const Map = () => {
  //destructure airport data from Zustand to use lat and long for map
  const { airport, setAirport } = useAirportStore();
  //const { stillLoading, setStillLoading } = useStillLoadingStore();

  //map works but updates only on refresh, need to fix it, look at using useEffect to wrap around all of the use store and definiting variables, and passing through the airport info

  const latitude = airport.latitude_deg;
  const longitude = airport.longitude_deg;
  console.log(`new latitude in map is:`, latitude);
  console.log(`new longitude in map is:`, longitude);

  // if (stillLoading) {
  //   return <div>loading data....</div>;
  // }

  if (latitude && longitude) {
    return (
      <>
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
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </>
    );
  } else {
    return <div>loading data....</div>;
  }
};
