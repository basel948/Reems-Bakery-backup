import React from "react";
import styles from "./Table.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 124512,
      product: "BASEL aBED",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52qqyY2Mosgxt-Pt00pZy4TqIhCanFTwyLwC-D0z5&s",
      customer: "basel abewd",
      date: "25/12/1997",
      amount: 10,
      method: "Cash on Delivery",
      status: "تمت الموافقة",
    },
    {
      id: 1213456,
      product: "reem Abed",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52qqyY2Mosgxt-Pt00pZy4TqIhCanFTwyLwC-D0z5&s",
      customer: "basel abewd",
      date: "25/12/1997",
      amount: 10,
      method: "Cash on Delivery",
      status: "قيد الانتظار",
    },
    {
      id: 1134,
      product: "BASEL aBED",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52qqyY2Mosgxt-Pt00pZy4TqIhCanFTwyLwC-D0z5&s",
      customer: "basel abewd",
      date: "25/12/1997",
      amount: 10,
      method: "Cash on Delivery",
      status: "قيد الانتظار",
    },
    {
      id: 6585,
      product: "Mahmod Agbaria",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52qqyY2Mosgxt-Pt00pZy4TqIhCanFTwyLwC-D0z5&s",
      customer: "basel abewd",
      date: "25/12/1997",
      amount: 10,
      method: "Cash on Delivery",
      status: "تمت الموافقة",
    },
    {
      id: 658658,
      product: "BASEL aBED",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52qqyY2Mosgxt-Pt00pZy4TqIhCanFTwyLwC-D0z5&s",
      customer: "basel abewd",
      date: "25/12/1997",
      amount: 10,
      method: "Cash on Delivery",
      status: "تمت الموافقة",
    },
    {
      id: 236823,
      product: "BASEL aBED",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52qqyY2Mosgxt-Pt00pZy4TqIhCanFTwyLwC-D0z5&s",
      customer: "basel abewd",
      date: "25/12/1997",
      amount: 10,
      method: "Cash on Delivery",
      status: "تمت الموافقة",
    },
    {
      id: 23526,
      product: "BASEL aBED",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52qqyY2Mosgxt-Pt00pZy4TqIhCanFTwyLwC-D0z5&s",
      customer: "basel abewd",
      date: "25/12/1997",
      amount: 10,
      method: "Cash on Delivery",
      status: "قيد الانتظار",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "قيد الانتظار":
        return "statusPending";
      case "تمت الموافقة":
        return "statusApproved";
      default:
        return "";
    }
  };

  return (
    <TableContainer component={Paper} className={styles["table"]}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles["tableCell"]}>معرف التتبع</TableCell>
            <TableCell className={styles["tableCell"]}>المنتج</TableCell>
            <TableCell className={styles["tableCell"]}>الزبون</TableCell>
            <TableCell className={styles["tableCell"]}>التاريخ</TableCell>
            <TableCell className={styles["tableCell"]}>الكمية</TableCell>
            <TableCell className={styles["tableCell"]}>طريقة الدفع</TableCell>
            <TableCell className={styles["tableCell"]}>الحالة</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className={styles["tableCell"]}>{row.id}</TableCell>
              <TableCell className={styles["tableCell"]}>
                {row.product}
              </TableCell>
              <TableCell className={styles["tableCell"]}>
                {row.customer}
              </TableCell>
              <TableCell className={styles["tableCell"]}>{row.date}</TableCell>
              <TableCell className={styles["tableCell"]}>
                {row.amount}
              </TableCell>
              <TableCell className={styles["tableCell"]}>
                {row.method}
              </TableCell>
              <TableCell className={styles["tableCell"]}>
                <span
                  className={`${styles.status} ${
                    styles[getStatusClass(row.status)]
                  }`}
                >
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
