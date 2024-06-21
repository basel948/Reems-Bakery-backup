import React from "react";
import styles from "./AccountSettings.module.css";
import { useTranslation } from "react-i18next";

const AccountSettings = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles["accountSettings"]}>
      <h1 className={styles["mainHeader"]}>{t("Dialoges.personalDetails")}</h1>

      <div className={styles["form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">{t("Dialoges.userName")} </label>
          <input type="text" name="username" id="username" />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="phoneNumber">{t("Dialoges.phoneNumber")} </label>
          <input type="text" name="phoneNumber" id="phoneNumber" />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="email">{t("Dialoges.email")} </label>
          <input type="email" name="email" id="email" />
        </div>
      </div>
      <button className={styles["mainButton"]}>
        {t("Dialoges.saveChanges")}
      </button>
    </div>
  );
};

export default AccountSettings;
