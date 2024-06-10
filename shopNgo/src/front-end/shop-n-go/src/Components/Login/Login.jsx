import React, { useState } from "react"; // Import React and useState hook
import styles from "./Login.module.css"; // Import CSS module for styling
import { MdAlternateEmail, MdLock } from "react-icons/md"; // Import icons from react-icons
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import more icons from react-icons
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { useDispatch, useSelector } from "react-redux"; // Import hooks from react-redux
import { loginUser } from "../../Redux/features/userSlice"; // Import loginUser action from userSlice
import { useTranslation } from "react-i18next";

import StandartSwalAlert from "../UI/SwalAlert/StandartSwalAlert";

function Login({ show, onClose, switchToRegister }) {
  // Define state variables using useState hook
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { t, i18n } = useTranslation();

  // Initialize dispatch and navigate hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get status and error from the Redux store
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Validate email format
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // Check if password contains at least one capital letter
  const passHasCapital = (password) => /[A-Z]/.test(password);

  // Handle email input change
  const emailHandler = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  // Handle password input change
  const passwordHandler = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setIsPasswordValid(
      passwordValue.length > 4 && passHasCapital(passwordValue)
    );
  };

  // Handle form submission
  const loginHandler = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    // Check if email and password are valid
    if (email && password && isEmailValid && isPasswordValid) {
      const user = {
        login: email,
        password: password,
      };
      console.log("User:", user);

      // Dispatch loginUser action with user data
      dispatch(loginUser(user))
        .unwrap()
        .then(() => {
          onClose(); // Close the login form

          StandartSwalAlert({
            position: "top",
            icon: "success",
            title: t("Dialoges.loginSuccess"),
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/", { behavior: "smooth" }); // Navigate to the home page
        })
        .catch((err) => {
          console.error("Login error:", err);
          StandartSwalAlert({
            position: "top",
            icon: "error",
            title: t("Dialoges.loginError"),
            showConfirmButton: true,
            confirmButtonText: "OK",
          });
        });
    } else {
      setIsEmailValid(false);
      setIsPasswordValid(false);
    }
  };

  // If the show prop is false, don't render anything
  if (!show) return null;

  return (
    <div className={styles["popupOverlay"]}>
      <div className={styles["popupContent"]}>
        <button className={styles["closeButton"]} onClick={onClose}>
          X
        </button>
        <div className={styles["login"]}>
          <div className={styles["center"]}>
            <form className={styles["form_main"]} onSubmit={loginHandler}>
              <p className={styles["heading"]}>تسجيل الدخول</p>
              <div className={styles["inputContainer"]}>
                <MdAlternateEmail className={styles["inputIcon"]} />
                <input
                  placeholder="البريد إلكتروني"
                  id="email"
                  className={`${styles["inputField"]} ${
                    !isEmailValid && isFormSubmitted ? styles["invalid"] : ""
                  }`}
                  type="text"
                  onChange={emailHandler}
                />
              </div>
              <div className={styles["inputContainer"]}>
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
                <input
                  placeholder="كلمة المرور"
                  id="password"
                  className={`${styles["inputField"]} ${
                    !isPasswordValid && isFormSubmitted ? styles["invalid"] : ""
                  }`}
                  type={isPasswordVisible ? "text" : "password"}
                  onChange={passwordHandler}
                />
                <MdLock className={styles["inputIcon"]} />
              </div>
              <button className={styles["button"]}>تسجيل</button>
              <div className={styles["signupContainer"]}>
                <p>ليس لديك أي حساب؟</p>
                <button className={styles["signUp"]} onClick={switchToRegister}>
                  قم بالاشتراك
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
