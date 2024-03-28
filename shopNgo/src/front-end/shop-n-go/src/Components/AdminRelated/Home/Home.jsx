import React from "react";
import SideBar from "../components/sideBar/SideBar";
import styles from "./Home.module.scss";
import Navbar from "../components/navbar/Navbar";
import Featured from "../components/featured/Featured";
import Chart from "../components/chart/Chart";
import Widget from "../components/widget/Widget";
import Table from "../components/table/Table";
const Home = () => {
  return (
    <div className={styles["home"]}>
      <SideBar />
      <div className={styles["homeContainer"]}>
        <Navbar />
        <div className={styles["widgets"]}>
          <Widget type="المستخدم" />
          <Widget type="الطلب" />
          <Widget type="الأرباح" />
          <Widget type="المشتريات" />
        </div>
        <div className={styles["charts"]}>
          <Featured />
          <Chart aspect={2 / 1} title="أرباح أخر 6 أشهر" />
        </div>

        <div className={styles["listContainer"]}>
          <div className={styles["listTitle"]}>Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
