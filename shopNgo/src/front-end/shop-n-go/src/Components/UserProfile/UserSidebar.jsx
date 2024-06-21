import React from "react";
import styles from "./UserSidebar.module.css";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { TiLocationOutline } from "react-icons/ti";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

const UserSidebar = ({ activepage }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={styles["userSidebar"]}>
      {activepage === "accountsettings" ? (
        <div className={styles["section2"]}>
          <CgProfile className={styles["icon"]} />
          <span>Account Settings</span>
        </div>
      ) : (
        <Link
          to={"/profile/accountsettings"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={styles["section1"]}>
            <CgProfile className={styles["icon"]} />
            <span>Account Settings</span>
          </div>
        </Link>
      )}

      {activepage === "yourorders" ? (
        <div className={styles["section2"]}>
          <LiaShoppingBagSolid className={styles["icon"]} />
          <span>Your Orders</span>
        </div>
      ) : (
        <Link
          to={"/profile/yourorders"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={styles["section1"]}>
            <LiaShoppingBagSolid className={styles["icon"]} />
            <span>Your Orders</span>
          </div>
        </Link>
      )}

      {activepage === "useraddress" ? (
        <div className={styles["section2"]}>
          <TiLocationOutline className={styles["icon"]} />
          <span>Update Address</span>
        </div>
      ) : (
        <Link
          to={"/profile/useraddress"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={styles["section1"]}>
            <TiLocationOutline className={styles["icon"]} />
            <span>Update Address</span>
          </div>
        </Link>
      )}

      {activepage === "changepassword" ? (
        <div className={styles["section2"]}>
          <RiLockPasswordLine className={styles["icon"]} />
          <span>Change Password</span>
        </div>
      ) : (
        <Link
          to={"/profile/changepassword"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={styles["section1"]}>
            <RiLockPasswordLine className={styles["icon"]} />
            <span>Change Password</span>
          </div>
        </Link>
      )}
    </div>
  );
};
export default UserSidebar;
