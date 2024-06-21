import React from "react";
import styles from "./List.module.scss";
import SideBar from "../components/sideBar/SideBar";
import Navbar from "../components/navbar/Navbar";
import DataTable from "../components/DataTable/DataTable";

const List = () => {
  return (
    <div className={styles["list"]}>
      <SideBar />
      <div className={styles["listContainer"]}>
        <Navbar />
        <DataTable />
      </div>
    </div>
  );
};

export default List;
