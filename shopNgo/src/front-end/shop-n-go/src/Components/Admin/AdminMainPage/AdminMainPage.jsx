import React, { useContext, useEffect, useState } from "react";
import styles from "./AdminMainPage.module.css";
import SideBar from "../SideBar/SideBar";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AppContext } from "../../../AppProvider";
import DashBoardTopCard from "../DashoBoardTopCards/DashBoardTopCard";
import { Grid } from "@mui/material";

function AdminMainPage() {
  const { page } = useParams();
  const [LoggedInUser, setLoggedInUser] = useState();
  const { categories, userData } = useContext(AppContext);
  const [totalUserCounter, setTotalUserCounter] = useState(0);
  const [totalPurchasesAmount, setTotalPurchasesAmount] = useState(0);
  const [totalProfitsAmount, setTotalProfitsAmount] = useState(0);

  useEffect(() => {
    if (!LoggedInUser) {
      // Retrieve LoggedInUser from localStorage
      const storedUserData = JSON.parse(localStorage.getItem("LoggedInUser"));
      if (storedUserData) {
        // Update the state in your component or context
        setLoggedInUser(storedUserData);
      }
    }
  }, []);

  useEffect(() => {
    // Count total non-admin users
    const counter = userData.filter((user) => !user.admin).length;
    setTotalUserCounter(counter);

    // Calculate total profits and purchases
    let profits = 0;
    let purchases = 0;
    categories.forEach((cat) => {
      cat.menuItems.forEach((product) => {
        profits += product.numberOfPurchases * product.price;
        purchases += product.numberOfPurchases;
      });
    });
    setTotalProfitsAmount(profits);
    setTotalPurchasesAmount(purchases);
  }, [categories, userData]);

  return (
    <div className={styles["adminMainPage"]}>
      <div className={styles["mainContent"]}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <DashBoardTopCard
              title="إجمالي المشتريات"
              value={totalPurchasesAmount}
            />
          </Grid>
          <Grid item xs={4}>
            <DashBoardTopCard
              title="إجمالي الأرباح"
              value={`₪${totalProfitsAmount}`}
            />
          </Grid>
          <Grid item xs={4}>
            <DashBoardTopCard
              title="إجمالي المستخدمين"
              value={totalUserCounter}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AdminMainPage;
