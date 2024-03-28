import React, { useState, useEffect } from "react";
import styles from "./InnerNavBar.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const InnerNavBar = () => {
  const [scroll, setScroll] = useState(false);
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();
  const checkScroll = () => {
    setScroll(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <div
      className={`${styles["navbar"]} ${scroll ? styles["navbar-scroll"] : ""}`}
    >
      <button
        id="home-page"
        className={styles["nav-button"]}
        onClick={() => {
          navigate("/", { behavior: "smooth" });
        }}
      >
        {t("innerNavBar.home-page")}
      </button>

      <div
        className={styles["nav-logo"]}
        onClick={() => {
          navigate("/homepage");
        }}
      >
        Reem's Bakery
      </div>

      <button
        id="contact_us"
        className={styles["nav-button"]}
        onClick={() => {
          document
            .getElementById("contact-us")
            .scrollIntoView({ behavior: "smooth" });
        }}
      >
        {t("navbar.contact_us")}
      </button>

      <button
        id="language"
        className={styles["nav-button-language"]}
        onClick={() => {
          if (i18n.language === "ar") {
            i18n.changeLanguage("he"); // change to Hebrew
          } else {
            i18n.changeLanguage("ar"); // change to Arabic
          }
        }}
      >
        {t("navbar.language")}
      </button>
    </div>
  );
};

export default InnerNavBar;
