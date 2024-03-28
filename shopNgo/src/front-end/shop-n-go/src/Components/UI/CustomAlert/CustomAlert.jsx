import React, { useEffect } from "react";
import styles from "./CustomAlert.module.css"; // Assume the CSS is in Alert.module.css

const CustomAlert = ({ message, duration = 3000, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div className={styles["alert"]}>
      <p>{message}</p>
      <div
        className={styles["timerLine"]}
        style={{ animationDuration: `${duration}ms` }}
      ></div>
    </div>
  );
};

export default CustomAlert;
