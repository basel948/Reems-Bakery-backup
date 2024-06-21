import React from "react";
import styles from "./YourOrders.module.css";

const YourOrders = () => {
  const data = [
    { id: 1, date: "25/12/2015", status: "Delivered", total: "100$" },
    { id: 2, date: "15/12/2021", status: "On The Way", total: "250$" },
    { id: 3, date: "27/12/2012", status: "Cancelled", total: "1000$" },
    { id: 4, date: "25/11/2023", status: "Delivered", total: "200$" },
    { id: 5, date: "25/12/2015", status: "Cancelled", total: "100$" },
    { id: 6, date: "15/12/2021", status: "On The Way", total: "250$" },
    { id: 7, date: "27/12/2012", status: "Cancelled", total: "1000$" },
    { id: 8, date: "25/11/2023", status: "Delivered", total: "200$" },
  ];
  return (
    <div className={styles["yourorders"]}>
      <h1 className={styles["mainHeader"]}>Your Orders</h1>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                {/* <td>{item.status === "Delivered" ? "" : ""}</td> */}
                <td>
                  <p>
                    {item.status == "Delivered" && (
                      <span className={styles["greenDot"]}></span>
                    )}
                    {item.status == "On The Way" && (
                      <span className={styles["orangeDot"]}></span>
                    )}
                    {item.status == "Cancelled" && (
                      <span className={styles["redDot"]}></span>
                    )}
                    {item.status}
                  </p>
                </td>
                <td>{item.total}</td>
                <td>
                  <button className={styles["mainButton"]}>View Order</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default YourOrders;
