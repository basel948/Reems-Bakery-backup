import React, { useState, useContext } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../AppProvider";
import { FaUserAlt } from "react-icons/fa";
import { MdAlternateEmail, MdLock, MdOutlineLockReset } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import LocationButton from "../UI/LocationButton/LocationButton";
import LocationMap from "../UI/LocationMap/LocationMap";

function Register({ show, onClose, switchToLogin }) {
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [phoneNumber, setphoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [rePassword, setRePassword] = useState("");
  const [isRePasswordValid, setIsRePasswordValid] = useState(true);
  const [moreInfo, setMoreInfo] = useState("");
  const [currentLocation, setCurrentLocation] = useState({});
  const [isCurrentLocationValid, setIsCurrentLocationValid] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  const { userData } = useContext(AppContext);

  const [user, setUser] = useState({});

  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleRePasswordVisibility = () => {
    setIsRePasswordVisible(!isRePasswordVisible);
  };
  const usernameHandler = (e) => {
    setUsername(e.target.value);
    setIsUsernameValid(e.target.value.length >= 3);
  };
  const emailHandler = (e) => {
    let emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(
      e.target.value.length > 4 && passHasCapital(e.target.value)
    );
  };
  const rePasswordHandler = (e) => {
    setRePassword(e.target.value);
    setIsRePasswordValid(
      e.target.value.length > 4 && passHasCapital(e.target.value)
    );
  };

  const phoneNumberHandler = (e) => {
    setphoneNumber(e.target.value);
    setIsPhoneNumberValid(e.target.value.length === 10);
  };

  const moreInfoHandler = (e) => {
    setMoreInfo(e.target.value);
  };
  const handleLocation = (latitude, longitude, address, city) => {
    // console.log(`${latitude} ${longitude} ${address} ${city}`);

    setCurrentLocation({ latitude, longitude, address, city });

    if (latitude && longitude) {
      setIsCurrentLocationValid(true); // Set the flag to true if location is obtained
    }
  };

  // Close handler to call onClose when you want to close the modal
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const passHasCapital = (password) => {
    for (let i = 0; i < password.length; i++) {
      let c = password.charAt(i);
      if ("A" <= c && c <= "Z") {
        return true;
      }
    }
    return false;
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const UserAlreadyExistsInDB = (email) => {
    // Check if userData is an array and has elements
    if (Array.isArray(userData) && userData.length) {
      return userData.some((user) => user.email === email);
    }

    // If userData is not an array or is empty, return false
    console.error("userData is not an array or is empty");
    return false;
  };

  // console.log(currentLocation);
  const registerHandler = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (username.length === 0 && password.length === 0 && email.length === 0) {
      setIsUsernameValid(false);
      setIsEmailValid(false);
      setIsPasswordValid(false);
      setIsRePasswordValid(false);
      setIsPhoneNumberValid(false);
      setIsCurrentLocationValid(false);
      return; // exit the function if validation fails
    }

    if (!UserAlreadyExistsInDB(email)) {
      if (
        isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        rePassword === password &&
        isPhoneNumberValid &&
        isCurrentLocationValid
      ) {
        const newUser = {
          username: username,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude, // Add the location data
          city: currentLocation.city,
          address: currentLocation.address,
          moreInfo: moreInfo,
        };
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/signup",
            newUser
          );
          if (response.status === 200) {
            setUser(response.data);
            setTimeout(() => {
              alert("You have successfully been registered!");
              switchToLogin();
            }, [3000]);
          }
        } catch (error) {
          alert("Error adding employee:", error);
        }
      } else {
        alert("user details are not valid");
      }
    } else {
      alert("user is allready registered");
    }
  };

  if (!show) return null; // If the show prop is false, don't render anything

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <button
          onClick={onClose} // Use the onClose prop to close the popup
          className={styles.closeButton}
        >
          X
        </button>
        <div className={styles["register"]}>
          <div className={styles["center"]}>
            <form
              className={styles["form_main"]}
              action=""
              onSubmit={registerHandler}
            >
              <p className={styles["heading"]}>التسجيل</p>
              <div className={styles["inputContainer"]}>
                <FaUserAlt className={styles["inputIcon"]} />
                <input
                  placeholder="ادخل اسم المستخدم"
                  id="username"
                  className={`${styles["inputField"]} ${
                    !isUsernameValid && isFormSubmitted ? styles["invalid"] : ""
                  }`}
                  type="text"
                  onChange={usernameHandler}
                />
              </div>
              <div className={styles["inputContainer"]}>
                <MdAlternateEmail className={styles["inputIcon"]} />
                <input
                  placeholder="أدخل البريد الإلكتروني"
                  id="email"
                  className={`${styles["inputField"]} ${
                    !isEmailValid && isFormSubmitted ? styles["invalid"] : ""
                  }`}
                  type="text"
                  onChange={emailHandler}
                />
              </div>
              <div className={styles["inputContainer"]}>
                <MdLock className={styles["inputIcon"]} />
                <input
                  placeholder="أدخل كلمة المرور"
                  id="password"
                  className={`${styles["inputField"]} ${
                    !isPasswordValid && isFormSubmitted ? styles["invalid"] : ""
                  }`}
                  type={isPasswordVisible ? "text" : "password"} // Toggle input type
                  onChange={passwordHandler}
                />
                <span onClick={togglePasswordVisibility}>
                  <svg
                    viewBox="0 0 16 16"
                    fill="#2e2e2e"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles["eyeIcon"]}
                  >
                    {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                  </svg>
                </span>
              </div>
              <div className={styles["inputContainer"]}>
                <MdOutlineLockReset className={styles["inputIcon"]} />
                <input
                  placeholder="إعادة إدخال كلمة المرور"
                  id="repassword"
                  className={`${styles["inputField"]} ${
                    !isRePasswordValid && isFormSubmitted
                      ? styles["invalid"]
                      : ""
                  }`}
                  type={isRePasswordVisible ? "text" : "password"} // Toggle input type
                  onChange={rePasswordHandler}
                />
                <span onClick={toggleRePasswordVisibility}>
                  <svg
                    viewBox="0 0 16 16"
                    fill="#2e2e2e"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles["eyeIcon"]}
                  >
                    {isRePasswordVisible ? <FaEye /> : <FaEyeSlash />}
                  </svg>
                </span>
              </div>
              <div className={styles["inputContainer"]}>
                <BsFillTelephoneInboundFill className={styles["inputIcon"]} />
                <input
                  placeholder="أدخل رقم الهاتف"
                  id="phoneNumber"
                  className={`${styles["inputField"]} ${
                    !isPhoneNumberValid && isFormSubmitted
                      ? styles["invalid"]
                      : ""
                  }`}
                  type="number"
                  onChange={phoneNumberHandler}
                />
              </div>

              {currentLocation.latitude && currentLocation.longitude ? (
                <div className={styles["location-section"]}>
                  <div className={styles["mapLocationContainer"]}>
                    <LocationMap
                      latitude={currentLocation.latitude}
                      longitude={currentLocation.longitude}
                    />
                  </div>
                  {/* Text area for entering additional information */}
                  <textarea
                    rows="4"
                    name="moreinfo"
                    id="moreinfo"
                    className={styles.textarea}
                    placeholder="اضف معلومات اضافيه عن الموقع"
                    onChange={moreInfoHandler}
                  ></textarea>
                </div>
              ) : (
                <div
                  className={`${styles["inputContainer"]} ${styles["locationButton"]}`}
                >
                  <h1 className={styles["locationButtonText"]}>
                    أدخل موقعك الحالي
                  </h1>
                  <LocationButton onLocationSelect={handleLocation} />
                </div>
              )}

              <button className={styles["button"]}>تسجيل</button>
              <button onClick={switchToLogin} className={styles["login"]}>
                هل لديك حساب؟ تسجيل الدخول
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
