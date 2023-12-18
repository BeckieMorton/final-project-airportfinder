import { BrowserRouter, NavLink, Routes } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div>
      <nav>
        <div className={styles.headerContainerMobile}>
          <NavLink to="/">
            <img
              src="/assets/AirportFinder_transparent_orangedb.png"
              alt="AirportFinder Logo"
            />
          </NavLink>
        </div>
        <div className={styles.headerContainerDesktop}>
          <NavLink to="/">
            <img
              src="/assets/AirportFinder_transparent_orangedb.png"
              alt="Airport Finder Logo"
            />
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
