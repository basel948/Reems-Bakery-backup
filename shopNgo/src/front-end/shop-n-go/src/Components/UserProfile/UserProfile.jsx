import React, { useState, useContext, useEffect } from "react";
import styles from "./UserProfile.module.css";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import UserSidebar from "./UserSidebar";
import AccountSettings from "./AccountSettings";
import ChangePassword from "./ChangePassword";
import YourOrders from "./YourOrders";
import UserAddress from "./UserAddress";
import axios from "axios";
function UserProfile() {
  // get the active page from the url parameter
  const { activepage } = useParams();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        console.log(token);
        const response = await axios.get(
          "http://localhost:8080/api/auth/users/currentUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching current user data, " + error);
        // Handle errors here, such as redirecting to login if token is invalid
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className={styles["userProfile"]}>
      <Navbar />
      <div className={styles["userProfilein"]}>
        <div className={styles["leftContainer"]}>
          <UserSidebar activepage={activepage} />
        </div>
        <div className={styles["rightContainer"]}>
          {activepage === "accountsettings" && <AccountSettings />}
          {activepage === "yourorders" && <YourOrders />}
          {activepage === "useraddress" && <UserAddress />}
          {activepage === "changepassword" && <ChangePassword />}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
