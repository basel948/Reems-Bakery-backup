import React from "react";
import styles from "./Single.module.scss";
import SideBar from "../components/sideBar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Chart from "../components/chart/Chart";
import List from "../components/table/Table";
const Single = () => {
  return (
    <div className={styles["single"]}>
      <SideBar />
      <div className={styles["singleContainer"]}>
        <Navbar />
        <div className={styles["top"]}>
          <div className={styles["left"]}>
            <div className={styles["editButton"]}>Edit</div>

            <h1 className={styles["title"]}>التفاصيل</h1>
            <div className={styles["item"]}>
              <img
                src="https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg"
                alt=""
                className={styles["itemImg"]}
              />
              <div className={styles["details"]}>
                <h1 className={styles["itemTitle"]}>Jane Doe</h1>
                <div className={styles["detailItem"]}>
                  <span className={styles["itemKey"]}>البريد الإلكتروني :</span>
                  <span className={styles["itemValue"]}>
                    Basel.qhawiesh@gmail.com
                  </span>
                </div>
                <div className={styles["detailItem"]}>
                  <span className={styles["itemKey"]}>رقم الهاتف :</span>
                  <span className={styles["itemValue"]}>0505694697</span>
                </div>
                <div className={styles["detailItem"]}>
                  <span className={styles["itemKey"]}>العنوان :</span>
                  <span className={styles["itemValue"]}>Umm Al Fahem</span>
                </div>
                <div className={styles["detailItem"]}>
                  <span className={styles["itemKey"]}>البلد :</span>
                  <span className={styles["itemValue"]}>Israel</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["right"]}>
            <Chart aspect={4 / 1} title="إنفاق المستخدم ( آخر 6 أشهر )" />
          </div>
        </div>
        <div className={styles["bottom"]}>
          <h1 className={styles["title"]}>المعاملات الأخيرة</h1>

          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
