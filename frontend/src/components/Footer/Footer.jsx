import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerBox}>
          <img src="/assets/AirportFinder_transparent_darkb.png" />
        </div>
        <div className={styles.footerBox}>
          <p>Technigo Web Development Boot Camp Autumn 2023</p>
        </div>
      </div>
    </>
  );
};
