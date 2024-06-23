import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, fetchCurrentUser } from "../../Redux/features/userSlice";
import styles from "./AccountSettings.module.css";
import { useNavigate } from "react-router-dom";
import StandartSwalAlert from "../UI/SwalAlert/StandartSwalAlert";

const AccountSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const userStatus = useSelector((state) => state.user.status);

  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [userNamePlaceholder, setUserNamePlaceholder] = useState(
    userData.username
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [phoneNumberPlaceholder, setPhoneNumberPlaceholder] = useState(
    userData.phoneNumber
  );
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailPlaceholder, setEmailPlaceholder] = useState(userData.email);

  console.log(userData);
  console.log(userStatus);

  useEffect(() => {
    if (!userData && userStatus === "idle") {
      dispatch(fetchCurrentUser());
    } else if (userData) {
      setUsername(userData.username);
      setPhoneNumber(userData.phoneNumber);
      setEmail(userData.email);
    }
  }, [dispatch, userData, userStatus]);

  const usernameHandler = (e) => {
    setUsername(e.target.value);
    setIsUsernameValid(
      e.target.value.length >= 3 && e.target.value !== userData.username
    );
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const emailHandler = (e) => {
    let emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue) && emailValue !== userData.email);
  };

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
    setIsPhoneNumberValid(
      e.target.value.length === 10 && e.target.value !== userData.phoneNumber
    );
  };

  const saveChangesHandler = () => {
    if (isUsernameValid && isPhoneNumberValid && isEmailValid) {
      const updatedUserData = {
        id: userData.id,
        username,
        phoneNumber,
        email,
      };
      dispatch(updateUser(updatedUserData))
        .unwrap()
        .then(() => {
          StandartSwalAlert({
            title: t("Dialoges.updatedSeccessfullyTitle"),
            text: t("Dialoges.updatedSeccessfullyMsg"),
            icon: "success",
          });
          navigate("/");
        })
        .catch((error) => {
          StandartSwalAlert({
            title: t("Dialoges.updateFailedTryAgainTitle"),
            text: t("Dialoges.updateFailedTryAgainMsg"),
            icon: "error",
          });
        });
    } else {
      if (!isUsernameValid) {
        StandartSwalAlert({
          title: t("Dialoges.invalidUserNameTitle"),
          text: t("Dialoges.invalidUserNameMsg"),
          icon: "error",
        });
      }
      if (!isPhoneNumberValid) {
        StandartSwalAlert({
          title: t("Dialoges.invalidPhoneNumberTitle"),
          text: t("Dialoges.invalidPhoneNumberMsg"),
          icon: "error",
        });
      }
      if (!isEmailValid) {
        StandartSwalAlert({
          title: t("Dialoges.invalidEmailTitle"),
          text: t("Dialoges.invalidEmailMsg"),
          icon: "error",
        });
      }
    }
  };

  if (userStatus === "loading") {
    return <div>Loading...</div>; // Show loading indicator while fetching user data
  }

  if (!userData) {
    return <div>No user data available.</div>; // Handle case where userData is not available
  }

  return (
    <div className={styles["accountSettings"]}>
      <h1 className={styles["mainHeader"]}>{t("Dialoges.personalDetails")}</h1>

      <div className={styles["form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">{t("Dialoges.userName")} </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder={userNamePlaceholder}
            onChange={usernameHandler}
            onFocus={() => setUserNamePlaceholder("")}
            onBlur={() => setUserNamePlaceholder(userData?.username || "")}
          />
          {/* {!isUsernameValid && username && (
            <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>
              Username must be longer than 3 characters
            </p>
          )} */}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="phoneNumber">{t("Dialoges.phoneNumber")} </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder={phoneNumberPlaceholder}
            onChange={phoneNumberHandler}
            onFocus={() => setPhoneNumberPlaceholder("")}
            onBlur={() =>
              setPhoneNumberPlaceholder(userData?.phoneNumber || "")
            }
          />
          {/* {!isPhoneNumberValid && phoneNumber && (
            <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>
              Phone Number must be 10 digits
            </p>
          )}*/}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="email">{t("Dialoges.email")} </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={emailHandler}
            placeholder={emailPlaceholder}
            onFocus={() => setEmailPlaceholder("")}
            onBlur={() => setEmailPlaceholder(userData?.email || "")}
          />
          {/* {!isEmailValid && email && (
            <p style={{ color: "red", fontSize: "14px", margin: "0px" }}>
              Email is not valid
            </p>
          )} */}
        </div>
      </div>
      <button className={styles["mainButton"]} onClick={saveChangesHandler}>
        {t("Dialoges.saveChanges")}
      </button>
    </div>
  );
};

export default AccountSettings;
