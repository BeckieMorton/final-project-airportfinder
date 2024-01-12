import styles from "./Footer.module.css";

export const Footer = ({ cameFrom }) => {
  let containerClassName = styles.footerContainer;
  if (cameFrom === "home") {
    containerClassName = styles.footerContainerName;
  } else if (cameFrom === "country") {
    containerClassName = styles.footerContainerCountry;
  } else if (cameFrom === "iata") {
    containerClassName = styles.footerContainerIata;
  } else if (cameFrom === "name") {
    containerClassName = styles.footerContainerName;
  }

  return (
    <>
      <div className={containerClassName}>
        <p>
          Technigo Web Development Boot Camp &#183; Autumn 2023 &#183; Beckie
          Morton
        </p>
        <div className={styles.links}>
          <div className={styles.linkGit}>
            <a href="https://github.com/BeckieMorton">
              <img src="/assets/github.png" alt="github logo" />
            </a>
          </div>
          <div className={styles.linkLinked}>
            <a href="https://www.linkedin.com/in/rebecca-morton-739446204/">
              <img src="/assets/linkedin.png" alt="linkedin logo" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
