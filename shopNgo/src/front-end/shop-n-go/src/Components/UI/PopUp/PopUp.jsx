import React, { useEffect } from "react";
import styles from "./PopUp.module.css";

const PopUp = ({ message, duration, onTimerEnd }) => {
  let timer;

  useEffect(() => {
    timer = setTimeout(() => {
      onTimerEnd();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onTimerEnd]);

  return (
    <div className={styles["popup"]}>
      <p>{message}</p>
      <div
        className={styles["timerLine"]}
        style={{ animationDuration: `${duration}ms` }}
      ></div>
    </div>
  );
};

export default PopUp;
