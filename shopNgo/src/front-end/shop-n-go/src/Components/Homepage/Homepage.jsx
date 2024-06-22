import React, { useEffect } from "react";
import styles from "./Homepage.module.css";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/Slider";
import CardMenuSlider from "../CardMenuSlider/CardMenuSlider";
import ContactUs from "../ContactUs/ContactUs";
import SplashScreen from "../SplashScreen/SlpashScreen";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTranslationInProgress } from "../../Redux/features/appSlice";

function Homepage() {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const translationInProgress = useSelector(
    (state) => state.app.translationInProgress
  );

  const userData = useSelector((state) => state.user.userData);
  const userStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // we do this to reset the scroll so we don't scroll to the bottom automatically

  useEffect(() => {
    if (translationInProgress) {
      setTimeout(() => {
        dispatch(setTranslationInProgress(false)); // End translation process
      }, 3000); // Adjust duration as needed
    }
  }, [translationInProgress, dispatch]);

  useEffect(() => {
    if (location.state?.scrollToContactUs) {
      const contactUs = document.getElementById("contact-us");
      if (contactUs) {
        contactUs.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (location.state?.scrollToAboutUs) {
      const aboutUs = document.getElementById("about-us");
      if (aboutUs) {
        aboutUs.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  if (translationInProgress) {
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
