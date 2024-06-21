import React from "react";
import styles from "./AccountSettings.module.css";
<<<<<<< HEAD

const AccountSettings = () => {
  return (
    <div className={styles["accountSettings"]}>
      <h1 className={styles["mainHeader"]}>Personal Information</h1>

      <div className={styles["form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">
            Your Username <span>*</span>
          </label>
=======
import { useTranslation } from "react-i18next";

const AccountSettings = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles["accountSettings"]}>
      <h1 className={styles["mainHeader"]}>{t("Dialoges.personalDetails")}</h1>

      <div className={styles["form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">{t("Dialoges.userName")} </label>
>>>>>>> master
          <input type="text" name="username" id="username" />
        </div>

        <div className={styles["form-group"]}>
<<<<<<< HEAD
          <label htmlFor="phoneNumber">
            Your Phone/Mobile <span>*</span>
          </label>
=======
          <label htmlFor="phoneNumber">{t("Dialoges.phoneNumber")} </label>
>>>>>>> master
          <input type="text" name="phoneNumber" id="phoneNumber" />
        </div>

        <div className={styles["form-group"]}>
<<<<<<< HEAD
          <label htmlFor="email">
            Your Email <span>*</span>
          </label>
          <input type="email" name="email" id="email" />
        </div>
      </div>
      <button className={styles["mainButton"]}>Save Changes</button>
=======
          <label htmlFor="email">{t("Dialoges.email")} </label>
          <input type="email" name="email" id="email" />
        </div>
      </div>
      <button className={styles["mainButton"]}>
        {t("Dialoges.saveChanges")}
      </button>
>>>>>>> master
    </div>
  );
};

export default AccountSettings;
