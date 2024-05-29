import React, { useState } from "react";
import styles from "./New.module.scss";
import SideBar from "../components/sideBar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const New = ({ inputs, title, imageTitle, buttonTitle }) => {
  const [file, setFile] = useState("");

  return (
    <div className={styles["new"]}>
      <SideBar />
      <div className={styles["newContainer"]}>
        <Navbar />
        <div className={styles["top"]}>
          <h1>{title}</h1>
        </div>
        <div className={styles["bottom"]}>
          <div className={styles["right"]}>
            <form>
              <div className={styles["formInput"]}>
                <label htmlFor="file">
                  {imageTitle}
                  <DriveFolderUploadOutlinedIcon className={styles["icon"]} />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </div>

              {inputs.map((input) => (
                <div className={styles["formInput"]} key={input.id}>
                  <label htmlFor="">{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button>{buttonTitle}</button>
            </form>
          </div>
          <div className={styles["left"]}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="No Image Available"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
