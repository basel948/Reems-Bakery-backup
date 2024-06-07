import React, { useContext } from "react";
import styles from "./SplashScreen.module.css";
import Homepage from "../Homepage/Homepage";
import logo from "../../assets/muffin-animation.gif";
import { AppContext } from "../../AppProvider";

function SplashScreen() {
  const { loading, error } = useContext(AppContext);

  if (loading) {
    return (
      <div className={styles["splashscreen"]}>
        <img src={logo} className={styles.logo} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["error-screen"]}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return <Homepage />;
}

export default SplashScreen;
