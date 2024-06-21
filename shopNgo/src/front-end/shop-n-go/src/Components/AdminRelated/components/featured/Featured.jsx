import React from "react";
import styles from "./Featured.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className={styles["featured"]}>
      <div className={styles["top"]}>
        <h1 className={styles["title"]}>الأرباح الكلية</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className={styles["bottom"]}>
        <div className={styles["featuredChart"]}>
          <CircularProgressbar value={70} text="70%" strokeWidth={5} />
        </div>
        <p className={styles["title"]}>Total Sales Made Today</p>
        <p className={styles["amount"]}>$420</p>
        <p className={styles["desc"]}>
          Previous transactions processing. Last Payments may not be inculded
        </p>
        <div className={styles["summary"]}>
          <div className={styles["item"]}>
            <div className={styles["itemTitle"]}>Target</div>
            <div className={`${styles.itemResult} ${styles.positive}`}>
              <div className={styles["resultAmount"]}>$12.4k</div>
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
            </div>
          </div>

          <div className={styles["item"]}>
            <div className={styles["itemTitle"]}>Last Week</div>
            <div className={`${styles.itemResult} ${styles.negative}`}>
              <div className={styles["resultAmount"]}>$12.4k</div>
              <KeyboardArrowDownIcon fontSize="small" />
            </div>
          </div>

          <div className={styles["item"]}>
            <div className={styles["itemTitle"]}>Last Month</div>
            <div className={`${styles.itemResult} ${styles.positive}`}>
              <div className={styles["resultAmount"]}>$12.4k</div>
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
