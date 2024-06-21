import React from "react";
import styles from "./ChangePassword.module.css";

const ChangePassword = () => {
  return (
    <div className={styles["cahngePassword"]}>
      <h1 className={styles["mainHeader"]}>Change Password</h1>

      <div className={styles["form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="oldpassword">
            Old Password <span>*</span>
          </label>
          <input type="text" name="oldpassword" id="oldpassword" />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="newpassword">
            New Password <span>*</span>
          </label>
          <input type="password" name="newpassword" id="newpassword" />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="confirmpassword">
            Confirm Password <span>*</span>
          </label>
          <input type="password" name="confirmpassword" id="confirmpassword" />
        </div>
      </div>
      <button className={styles["mainButton"]}>Save Changes</button>
    </div>
  );
};

export default ChangePassword;
