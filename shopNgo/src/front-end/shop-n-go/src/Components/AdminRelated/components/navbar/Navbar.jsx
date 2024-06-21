import React from "react";
import styles from "./Navbar.module.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullScreenExitOutlinedIcon from "@mui/icons-material/FullScreenExitOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const Navbar = () => {
  return (
    <div className={styles["navbar"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["search"]}>
          <input type="text" placeholder="البحث..." />
          <SearchOutlinedIcon className={styles["icon"]} />
        </div>
        <div className={styles["items"]}>
          <div className={styles["item"]}>
            <LanguageOutlinedIcon
              className={styles["icon"]}
              style={{ marginLeft: "3px" }}
            />
            العربية
          </div>
          <div className={styles["item"]}>
            <DarkModeOutlinedIcon className={styles["icon"]} />
          </div>
          <div className={styles["item"]}>
            <FullScreenExitOutlinedIcon className={styles["icon"]} />
          </div>
          <div className={styles["item"]}>
            <ListOutlinedIcon className={styles["icon"]} />
          </div>
          <div className={styles["item"]}>
            {/* here we should take the admin's first letter of his name and display it here */}
            <p className={styles["initials"]}>B</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
