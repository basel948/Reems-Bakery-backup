import React, { useState, useEffect } from "react";
import styles from "./SplashScreen.module.css";
import Homepage from "../Homepage/Homepage";
import logo from "../../assets/muffin-animation.gif";

function SlpashScreen() {
  // a hook to show the splash screen when the component mounts
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // a hook to hide the splash screen when the component unmounts
  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
  });

  return (
    <>
      {showSplashScreen && (
        <div className={styles["splashscreen"]}>
          <img src={logo} className={styles.logo} />
        </div>
      )}
      {!showSplashScreen && <Homepage />}
    </>
  );
}
export default SlpashScreen;
