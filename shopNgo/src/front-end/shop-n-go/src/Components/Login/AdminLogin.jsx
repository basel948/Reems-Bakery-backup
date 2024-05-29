import React, { useContext, useState, useEffect } from "react";
import styles from "./AdminLogin.module.css"; // Assuming you have similar CSS
import { AppContext } from "../../AppProvider";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  // Add your login logic here
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

  const emailHandler = (e) => {
    let emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
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

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(
      e.target.value.length > 4 && passHasCapital(e.target.value)
    );
  };

  const getUserData = (email, password) => {
    const foundUser = userData.find((userData) => userData.email === email);
    if (foundUser) {
      if (foundUser.admin === true && foundUser.password === password) {
        setUser(foundUser);
        return foundUser;
      }
    } else {
      setUserData(null); // Explicitly set to null if user not found
      setIsEmailValid(false);
      setIsPasswordValid(false);
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    if (email && password && isEmailValid && isPasswordValid) {
      const foundUser = getUserData(email, password);
      if (foundUser) {
        localStorage.setItem("LoggedInUser", JSON.stringify(foundUser));
        navigate(`/admin`);
      } else {
        alert("Invalid Details, Please try again");
      }
    } else {
      setIsEmailValid(false);
      setIsPasswordValid(false);
    }
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["center"]}>
        <form className={styles["form_main"]} action="" onSubmit={loginHandler}>
          <p className={styles["heading"]}>تسجيل الدخول</p>
          <div className={styles["inputContainer"]}>
            <svg
              viewBox="0 0 16 16"
              fill="#2e2e2e"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className={styles["inputIcon"]}
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
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
                {isPasswordVisible ? (
                  <>
                    <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                  </>
                ) : (
                  <>
                    <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 01-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 002.79-.588zM5.21 3.088A7.028 7.028 0 018 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 00-4.474-4.474L5.21 3.089z" />
                    <path d="M5.525 7.646a2.5 2.5 0 002.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 012.829 2.829zm3.171 6l-12-12 .708-.708 12 12-.708.708z" />
                  </>
                )}
              </svg>
            </span>

            <input
              placeholder="كلمة المرور"
              id="password"
              className={`${styles["inputField"]} ${
                !isPasswordValid && isFormSubmitted ? styles["invalid"] : ""
              }`}
              type={isPasswordVisible ? "text" : "password"} // Toggle input type
              onChange={passwordHandler}
            />

            <svg
              viewBox="0 0 16 16"
              fill="#2e2e2e"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className={styles["inputIcon"]}
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
          </div>

          <button className={styles["button"]}>تسجيل</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
