import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import styles from "./AllUsers.module.css";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "username",
    headerName: "الاسم الكامل",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "البريد الالكتروني",
    width: 220,
    editable: true,
  },
  {
    field: "phoneNumber",
    headerName: "رقم الهاتف",
    width: 150,
    editable: true,
  },
  {
    field: "admin",
    headerName: "نوع المستخدم",
    type: "boolean",
    width: 200,
  },
  {
    field: "orders",
    headerName: "الطلبات",
    type: "boolean",
    width: 250,
  },
];

export default function AllUsers() {
  const userData = useSelector((state) => state.users.userData);

  const rows = userData || []; // Adding || [] to handle cases where userData is null or undefined

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              textAlign: "left",
            },
            "& .MuiDataGrid-cell": {
              textAlign: "left",
            },
            "& .MuiDataGrid-footerContainer": {
              display: "none", // Hide pagination controls
            },
          }}
        />
      </Box>
    </div>
  );
}
