import React from "react";
import styles from "./Widget.module.scss";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddCardIcon from "@mui/icons-material/AddCard";
const Widget = ({ type }) => {
  let data;

  //DUMMY
  const amount = 100;
  const diff = 20;
  switch (type) {
    case "المستخدم":
      data = {
        title: "المستخدمين",
        isMoney: false,
        link: "رؤية كافة المستخدمين",
        icon: (
          <PersonOutlineIcon
            className={styles["icon"]}
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "الأرباح":
      data = {
        title: "الأرباح",
        isMoney: true,
        link: "رؤية كافة الأرباح",
        icon: (
          <TrendingUpIcon
            className={styles["icon"]}
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      break;
    case "المشتريات":
      data = {
        title: "المشتريات",
        isMoney: false,
        link: "رؤية كافة المشتريات",
        icon: (
          <AddCardIcon
            className={styles["icon"]}
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
      };
      break;
    case "الطلب":
      data = {
        title: "الطلبيات",
        isMoney: false,
        link: "رؤية كافة الطلبيات",
        icon: (
          <ShoppingCartIcon
            className={styles["icon"]}
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          />
        ),
      };
      break;

    default:
      break;
  }
  return (
    <div className={styles["widget"]}>
      <div className={styles["left"]}>
        <span className={styles["title"]}>{data.title}</span>
        <span className={styles["counter"]}>
          {amount} {data.isMoney && "₪"}
        </span>
        <span className={styles["link"]}>{data.link}</span>
      </div>
      <div className={styles["right"]}>
        <div className={`${styles.percentage} ${styles.positive}`}>
          {diff} %
          <ExpandLessIcon />
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
