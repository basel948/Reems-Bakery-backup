import React, { useState, useContext, useEffect } from "react";
import styles from "./Login.module.css";
import { AppContext } from "../../AppProvider";
import { MdAlternateEmail, MdLock } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Hook for navigation

function Login({ show, onClose, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { setLoginInProgress } = useContext(AppContext);

  // Hook for page navigation
  const navigate = useNavigate();
  const { userdata } = useContext(AppContext);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
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
  const emailHandler = (e) => {
    let emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(emailValue.length >= 6);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(
      e.target.value.length > 4 && passHasCapital(e.target.value)
    );
  };

  const getUserData = (email) => {
    const foundUser = userdata.find((userData) => userData.email === email);
    if (foundUser) {
      setUserData(foundUser);
    } else {
      setUserData(null); // Explicitly set to null if user not found
      setIsEmailValid(false);
      setIsPasswordValid(false);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (email && password && isEmailValid && isPasswordValid) {
      const user = {
        username: email,
        password: password,
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/signin",
          user
        );
        if (response.status === 200) {
          setLoginInProgress(true);
          // store the token into the session or localStorage.
          localStorage.setItem("jwtToken", response.data.accessToken);
          // get all the users data from the token and make accessable from every where.
          fetchUserData(response.data.id, response.data.accessToken);
          // hide the login form
          onClose();
          navigate("/", { behavior: "smooth" });
        } else {
          alert("Login unsuccessful. Please check your details.");
        }
      } catch (error) {
        alert("Login unsuccessful. Please try again.");
      }
    } else {
      setIsEmailValid(false);
      setIsPasswordValid(false);
    }
  };

  const fetchUserData = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/auth/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (!show) return null; // If the show prop is false, don't render anything

  return (
    <>
      <div className={styles["popupOverlay"]}>
        <div className={styles["popupContent"]}>
          <button
            className={styles["closeButton"]}
            onClick={onClose} // Use the onClose prop to close the popup
          >
            X
          </button>
          <div className={styles["login"]}>
            <div className={styles["center"]}>
              <form
                className={styles["form_main"]}
                action=""
                onSubmit={loginHandler}
              >
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
                      !isPasswordValid && isFormSubmitted
                        ? styles["invalid"]
                        : ""
                    }`}
                    type={isPasswordVisible ? "text" : "password"} // Toggle input type
                    onChange={passwordHandler}
                  />

                  <MdLock className={styles["inputIcon"]} />
                </div>

                <button className={styles["button"]}>تسجيل</button>
                <div className={styles["signupContainer"]}>
                  <p>ليس لديك أي حساب؟</p>
                  <button
                    className={styles["signUp"]}
                    onClick={switchToRegister}
                  >
                    قم بالاشتراك
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
