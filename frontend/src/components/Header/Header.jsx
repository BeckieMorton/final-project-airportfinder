import { BrowserRouter, NavLink, Routes } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div>
      <nav>
        <div className={styles.headerContainer}>
          <NavLink to="/">
            <img src="./public/assets/AirportFinder_transparent_orangedb.png" />
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
