import React, { useState, useEffect, useContext } from "react";
import styles from "./Homepage.module.css";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/Slider";
import CardMenuSlider from "../CardMenuSlider/CardMenuSlider";
import ContactUs from "../ContactUs/ContactUs";
import SplashScreen from "../SplashScreen/SlpashScreen";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../AppProvider";

function Homepage() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const {
    translationInProgress,
    setTranslationInProgress,
    loginInProgress,
    setLoginInProgress,
    logoutInProgress,
    setLogoutInProgress,
  } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // we do this to reset the scroll so we don't scroll to the buttom automatically

  useEffect(() => {
    if (translationInProgress) {
      // Display splash screen for a set time or until translation is ready
      setTimeout(() => {
        setTranslationInProgress(false); // End translation process
      }, 3000); // Adjust duration as needed
    }
    if (loginInProgress) {
      setTimeout(() => {
        setLoginInProgress(false); // End translation process
      }, 3000); // Adjust duration as needed
    }
    if (logoutInProgress) {
      setTimeout(() => {
        setLogoutInProgress(false); // End translation process
      }, 3000); // Adjust duration as needed
    }
  }, [
    translationInProgress,
    setTranslationInProgress,
    loginInProgress,
    setLoginInProgress,
    logoutInProgress,
    setLogoutInProgress,
  ]);

  useEffect(() => {
    if (location.state?.scrollToContactUs) {
      // Scroll to the specific section
      const contactUs = document.getElementById("contact-us");
      if (contactUs) {
        contactUs.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (location.state?.scrollToAboutUs) {
      // Scroll to the specific section
      const aboutUs = document.getElementById("about-us");
      if (aboutUs) {
        aboutUs.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  if (translationInProgress || loginInProgress || logoutInProgress) {
    return <SplashScreen />;
  }

  return (
    <div className={styles["homepage-container"]}>
      <Navbar isTransparent={true} />
      <div id="homepage" className={styles["full-page-image"]}>
        <Slider />
      </div>
      <div id="about-us">
        <p id="about-us-paragraph" className={styles["about-us-paragraph"]}>
          {t("homepage.about-us-paragraph")}
        </p>
      </div>
      <div id="shop-online">
        <h1 className={styles["our-bakery-title"]} id="our-bakery-title">
          {t("homepage.our-bakery-title")}
        </h1>
        <CardMenuSlider />
        <section id="contact-us" className="contactUsSection">
          <ContactUs />
        </section>
      </div>
    </div>
  );
}

export default Homepage;
