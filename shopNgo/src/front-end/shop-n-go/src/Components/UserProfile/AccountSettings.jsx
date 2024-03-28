import React from "react";
import styles from "./AccountSettings.module.css";

const AccountSettings = () => {
  return (
    <div className={styles["accountSettings"]}>
      <h1 className={styles["mainHeader"]}>Personal Information</h1>

      <div className={styles["form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">
            Your Username <span>*</span>
          </label>
          <input type="text" name="username" id="username" />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="phoneNumber">
            Your Phone/Mobile <span>*</span>
          </label>
          <input type="text" name="phoneNumber" id="phoneNumber" />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="email">
            Your Email <span>*</span>
          </label>
          <input type="email" name="email" id="email" />
        </div>
      </div>
      <button className={styles["mainButton"]}>Save Changes</button>
    </div>
  );
};

export default AccountSettings;
