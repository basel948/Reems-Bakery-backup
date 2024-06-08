import React from "react";
import { useSelector } from "react-redux";
import styles from "./DataTable.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../../../dataTableSource";
import { Link } from "react-router-dom";

function DataTable() {
  const userData = useSelector((state) => state.users.userData);

  const rows = userData || []; // Adding || [] to handle cases where userData is null or undefined

  const actionColumn = [
    {
      field: "actions",
      headerName: "أجراءات",
      width: 200,
      renderCell: () => {
        return (
          <div className={styles["cellAction"]}>
            <Link to="/admin/users/test" style={{ textDecoration: "none" }}>
              <div className={styles["viewButton"]}>عرض</div>
            </Link>
            <div className={styles["deleteButton"]}>حذف</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles["dataTable"]}>
      <div className={styles["dataTableTitle"]}>
        إضافة مستخدم جديد
        <Link to="/admin/users/new" className={styles["link"]}>
          اضف جديد
        </Link>
      </div>
      <DataGrid
        className={styles["dataGrid"]}
        rows={rows}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}

export default DataTable;
