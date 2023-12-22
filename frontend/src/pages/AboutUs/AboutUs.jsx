import React from "react";

export const AboutUs = () => {
  return (
    <>
      <div>AboutUs</div>;
      <div className={styles.nameBox}>
        <a
          href="https://github.com/BeckieMorton"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src="./assets/github.png" alt="github link" />
        </a>
        <a
          href="https://www.linkedin.com/in/rebecca-morton-739446204/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src="./assets/linkedin.png" alt="linkedin link" />
        </a>
      </div>
    </>
  );
};
