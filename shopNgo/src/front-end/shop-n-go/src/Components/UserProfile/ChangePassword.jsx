import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../Redux/features/userSlice";
import { logout } from "../../Redux/features/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons from react-icons
import { useNavigate } from "react-router-dom";
import StandartSwalAlert from "../UI/SwalAlert/StandartSwalAlert";

const ChangePassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  let navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false); // Add this line
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
    setIsOldPasswordValid(e.target.value.length > 0);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
    setIsNewPasswordValid(
      e.target.value.length > 4 &&
        passHasCapital(e.target.value) &&
        e.target.value !== oldPassword
    );
  };

  const toggleOldPasswordVisibility = () => {
    setIsOldPasswordVisible(!isOldPasswordVisible);
  };
  // Toggle password visibility
  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  // Toggle password visibility
  const togglePasswordConfirmationVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setIsConfirmPasswordValid(e.target.value === newPassword);
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

  const saveChangesHandler = () => {
    if (isOldPasswordValid && isNewPasswordValid && isConfirmPasswordValid) {
      const passwordData = {
        oldPassword,
        newPassword,
      };
      console.log("Password Data before Dispatch: ", passwordData);
      console.log("Token before Dispatch: ", token);
      dispatch(changePassword({ passwordData, token }))
        .unwrap()
        .then(() => {
          StandartSwalAlert({
            title: t("Dialoges.updatedSeccessfully"),
            text: t("Dialoges.passwordUpdatedSuccessfully"),
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: t("Dialoges.loginAgain"),
            cancelButtonText: t("Dialoges.returnToHome"),
            timer: null,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(logout());

              StandartSwalAlert({
                position: "top",
                icon: "success",
                title: t("Dialoges.logoutSuccess"),
                showConfirmButton: false,
              });
            }
            navigate("/", { replace: true });
          });
        })
        .catch((error) => {
          console.log("Error in ChangePassword:", error);
          StandartSwalAlert({
            title: t("Dialoges.updateFailedTryAgain"),
            text: t("Dialoges.passwordUpdateFailed"),
            icon: "error",
          });
        });
    } else {
      if (!isOldPasswordValid) {
        StandartSwalAlert({
          title: t("Dialoges.updateFailedTryAgain"),
          text: t("Dialoges.invalidOldPassword"),
          icon: "error",
        });
      }
      if (!isNewPasswordValid) {
        StandartSwalAlert({
          title: t("Dialoges.updateFailedTryAgain"),
          text: t("Dialoges.invalidNewPassword"),
          icon: "error",
        });
      }
      if (!isConfirmPasswordValid) {
        StandartSwalAlert({
          title: t("Dialoges.updateFailedTryAgain"),
          text: t("Dialoges.invalidPasswordConfirmation"),
          icon: "error",
        });
      }
    }
  };

  return (
    <div className={styles["changePassword"]}>
      <h1 className={styles["mainHeader"]}>{t("Dialoges.changePassword")}</h1>

      <div className={styles["form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="oldpassword">
            {t("Dialoges.oldPassword")} <span>*</span>
          </label>
          <div className={styles["input-container"]}>
            <input
              type={isOldPasswordVisible ? "text" : "password"}
              name="oldpassword"
              id="oldpassword"
              onChange={handleOldPassword}
            />
            <span
              onClick={toggleOldPasswordVisibility}
              className={styles["eye-icon"]}
            >
              {isOldPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="newpassword">
            {t("Dialoges.newPassword")} <span>*</span>
          </label>
          <div className={styles["input-container"]}>
            <input
              name="newpassword"
              id="newpassword"
              type={isNewPasswordVisible ? "text" : "password"}
              onChange={handleNewPassword}
            />
            <span
              onClick={toggleNewPasswordVisibility}
              className={styles["eye-icon"]}
            >
              {isNewPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="confirmpassword">
            {t("Dialoges.confirmNewPassword")} <span>*</span>
          </label>
          <div className={styles["input-container"]}>
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmpassword"
              id="confirmpassword"
              onChange={handleConfirmPassword}
            />
            <span
              onClick={togglePasswordConfirmationVisibility}
              className={styles["eye-icon"]}
            >
              {isConfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
      </div>
      <button className={styles["mainButton"]} onClick={saveChangesHandler}>
        {t("Dialoges.saveChanges")}
      </button>
    </div>
  );
};

export default ChangePassword;
