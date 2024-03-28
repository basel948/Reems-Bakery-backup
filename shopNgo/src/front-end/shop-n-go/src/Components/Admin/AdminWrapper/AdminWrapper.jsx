import React from "react";
import SideBar from "../SideBar/SideBar";
import styles from "./AdminWrapper.module.css"; // You can define specific styles if needed
import { Outlet } from "react-router-dom";

const AdminWrapper = ({ children, LoggedInUser }) => {
  return (
    <div className={styles["adminWrapper"]}>
      <SideBar user={LoggedInUser} />
      <Outlet />
    </div>
  );
};

export default AdminWrapper;
