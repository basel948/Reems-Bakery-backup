import React from "react";
import styles from "./Sidebar.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider } from "@mui/material";

import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className={styles["sidebar"]}>
      <div className={styles["top"]}>
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className={styles["logo"]}>Reem's Bakery</span>
        </Link>
      </div>
      <hr />
      <div className={styles["center"]}>
        <ul>
          <p className={styles["title"]}>رئيسي</p>
          <Divider style={{ marginBottom: "20px", marginTop: "5px" }} />
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className={styles["icon"]} />

              <span>اللوحة الرئيسية</span>
            </li>
          </Link>

          <p className={styles["title"]}>القوائم</p>
          <Divider style={{ marginBottom: "20px", marginTop: "5px" }} />
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PeopleAltIcon className={styles["icon"]} />
              <span>الزبائن</span>
            </li>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <li>
              <RestaurantMenuIcon className={styles["icon"]} />
              <span>المنتوجات</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className={styles["icon"]} />
            <span>الطلبيات</span>
          </li>
          <li>
            <LocalShippingIcon className={styles["icon"]} />
            <span>التوصيل</span>
          </li>
          <p className={styles["title"]}>آخرون</p>
          <Divider style={{ marginBottom: "20px", marginTop: "5px" }} />
          <li>
            <BarChartIcon className={styles["icon"]} />
            <span>احصائيات</span>
          </li>
          <p className={styles["title"]}>المستخدم</p>
          <Divider style={{ marginBottom: "20px", marginTop: "5px" }} />
          <li>
            <AccountBoxIcon className={styles["icon"]} />
            <span>الحساب الشخصي</span>
          </li>
          <li>
            <LogoutIcon className={styles["icon"]} />
            <span>تسجيل خروج</span>
          </li>
        </ul>
      </div>
      <div className={styles["bottom"]}>
        <div className={styles["colorOption"]}></div>
        <div className={styles["colorOption"]}></div>
      </div>
    </div>
  );
};

export default SideBar;
