import React from "react";
import { useSelector } from "react-redux";
import styles from "./SplashScreen.module.css";
import Homepage from "../Homepage/Homepage";
import logo from "../../assets/muffin-animation.gif";

function SplashScreen() {
  const loading = useSelector((state) => state.app.loading);
  const error = useSelector((state) => state.app.error);

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
