import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import InputField from "../UI/InputField/InputField";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import PopUp from "../UI/PopUp/PopUp";
import axios from "axios";
import emailjs from "@emailjs/browser";

function ContactUs() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState("");
  const [isFullNameValid, setisFullNameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [phoneNumber, setphoneNumber] = useState("");
  const [isPhoneNumberValid, setisPhoneNumberValid] = useState(true);
  const [yourQuestion, setYourQuestion] = useState("");
  const [isYourQuestionValid, setisYourQuestionValid] = useState(true);
  const userData = useSelector((state) => state.user.userData) || {};
  const [showPopUp, setShowPopUp] = useState(false);

  const fullNameHandler = (e) => {
    setFullName(e.target.value);
    setisFullNameValid(e.target.value.length >= 2);
  };

  const phoneNumberHandler = (e) => {
    setphoneNumber(e.target.value);
    setisPhoneNumberValid(e.target.value.length === 10);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(validateEmail(e.target.value));
  };

  const yourQuestionHandler = (e) => {
    setYourQuestion(e.target.value);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (
      fullName.length === 0 ||
      phoneNumber.length === 0 ||
      email.length === 0 ||
      yourQuestion.length === 0
    ) {
      setisFullNameValid(false);
      setisPhoneNumberValid(false);
      setIsEmailValid(false);
      setisYourQuestionValid(false);
      return; // exit the function if validation fails
    }

    emailjs.init("v086MmqCZ4vjszbAY");

    const emailDataforUserCompany = {
      full_name: fullName,
      from_name: "Reem's Bakery",
      phoneNumber: phoneNumber,
      email: email,
      question: yourQuestion,
    };

    emailjs
      .send("service_2qx4g2s", "template_5928ahl", emailDataforUserCompany)
      .then(
        (response) => {
          setEmail("");
          setFullName("");
          setphoneNumber("");
          setYourQuestion("");
          setShowPopUp(true);
        },
        (err) => {
          console.error("Failed to send email. Error: ", err);
        }
      );
  };

  const onPopUpEnd = () => {
    setShowPopUp(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles["container"]}>
      {showPopUp && (
        <PopUp
          message="تم ارسال سؤالك بنجاح!"
          duration={5000}
          onTimerEnd={onPopUpEnd}
        />
      )}

      <h1 id="contact-us-title" className={styles["contact-us-title"]}>
        {t("contactUs.contact-us-title")}
      </h1>
      <div className={styles["form-container"]}>
        <form
          onSubmit={submitFormHandler}
          className={styles["contact-us-form"]}
        >
          <section className={styles["right-form-section"]}>
            <h3
              id="contact-us-form-text"
              className={styles["contact-us-form-text"]}
            >
              {t("contactUs.contact-us-form-text")}
              <span> igbareya.reem@gmail.com</span>
            </h3>
          </section>
          <section className={styles["middle-form-empty-section"]}></section>
          <section className={styles["left-form-section"]}>
            <InputField
              id="filled-basic"
              label={t("contactUs.fullName")}
              variant="filled"
              height="60px"
              className={`${!isFullNameValid ? styles["invalid"] : ""}`}
              value={fullName}
              onChange={fullNameHandler}
            />
            <InputField
              id="filled-basic"
              label={t("contactUs.phoneNumber")}
              variant="filled"
              height="60px" // Set a custom height
              className={`${!isPhoneNumberValid ? styles["invalid"] : ""}`}
              value={phoneNumber}
              onChange={phoneNumberHandler}
            />

            <InputField
              id="filled-basic"
              label={t("contactUs.email")}
              variant="filled"
              height="60px" // Set a custom height
              className={`${!isEmailValid ? styles["invalid"] : ""}`}
              value={email}
              onChange={emailHandler}
            />
            <InputField
              id="filled-basic"
              label={t("contactUs.enterYourQuestion")}
              variant="filled"
              height="100px" // Set a custom height
              className={`${!isYourQuestionValid ? styles["invalid"] : ""}`}
              value={yourQuestion}
              onChange={yourQuestionHandler}
            />

            <button
              type="submit"
              id="submit"
              className={styles["submit-button"]}
            >
              {t("contactUs.submit")}
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
