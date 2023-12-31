import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <>
      <div className={styles.footerContainer}>
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
