import Lottie from "lottie-react";
import loadingplane from "../../public/assets/animations/loadingplane.json";

import styles from "./LottieComponent.module.css";

export const LottieComponent = () => {
  const style = {
    height: 200,
  };

  return (
    <div className={styles.animationContainer}>
      <Lottie animationData={loadingplane} style={style} />
    </div>
  );
};
