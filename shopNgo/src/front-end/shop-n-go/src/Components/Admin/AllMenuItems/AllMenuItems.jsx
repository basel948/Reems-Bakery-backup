import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { AppContext } from "../../../AppProvider";
import IconButton from "@mui/material/IconButton";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./AllMenuItems.module.css";
import ViewItem from "../ViewItem/ViewItem";
import Alert from "@mui/material/Alert";
import DeleteItem from "../DeleteItem/DeleteItem";
import axios from "axios";

export default function AllMenuItems() {
  const { categories, updateCategories } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name_AR",
      headerName: "اسم المنتوج",
      width: 150,
    },
    {
      field: "description_AR",
      headerName: "وصف المنتوج",
      width: 400,
    },
    {
      field: "price",
      headerName: "سعر المنتوج",
      width: 90,
    },
    {
      field: "categoryName_AR",
      headerName: "فئة المنتوج",
      width: 150,
    },
    {
      field: "numberOfPurchases",
      headerName: "كمية البيع",
      width: 150,
    },
    {
      field: "numberOfServings",
      headerName: "تكفي لكمية",
      width: 150,
    },
    {
      field: "estimatedProcessingTime_AR",
      headerName: "فترة التحضير",
      width: 150,
    },
    {
      field: "ingredients_AR",
      headerName: "المكونات",
      width: 350,
    },
    {
      field: "actions",
      headerName: "أجراءات",
      width: 150,
      renderCell: (params) => (
        <strong>
          <IconButton
            color="inherit"
            onClick={() => viewItemHandler(params.row)}
          >
            <ViewIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => editItemHandler(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => deleteItemHandler(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </strong>
      ),
    },
  ];
  const viewItemHandler = (item) => {
    setSelectedProduct(item);
    setViewDialogOpen(true); // Open the dialog
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedProduct(null); // Reset the selected product when the dialog is closed
  };

  const editItemHandler = (item) => {
    // Logic to edit the item
    // console.log("Edit:", item);
  };

  const deleteItemHandler = (item) => {
    setSelectedProduct(item);
    setDeleteDialogOpen(true); // Open the dialog
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedProduct(null); // Reset the selected product when the dialog is closed
  };

  const handleDeleteConfirmation = async (shouldDelete) => {
    if (shouldDelete) {
      // console.log("Delete:", selectedProduct);
      try {
        await axios.delete(
          `http://localhost:8080/api/menuItems/${selectedProduct.id}`
        );
        <Alert severity="success">Item deleted successfully!</Alert>;

        // Update categories state to reflect the deletion
        const updatedCategories = categories.map((category) => {
          return {
            ...category,
            menuItems: category.menuItems.filter(
              (item) => item.id !== selectedProduct.id
            ),
          };
        });
        updateCategories(updatedCategories);

        // update local storage
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
      } catch (error) {
        alert("Error deleting, Check console for error!");
        console.error(error);
      }
    }
    // Close the dialog and reset state
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };
  // Transform categories into a flat array of menu items, each with its category name
  const transformedMenuItems = categories.flatMap((category) =>
    category.menuItems.map((item) => ({
      ...item,
      categoryName_AR: category.name_AR,
      categoryName_HE: category.name_HE,
    }))
  );

  const rows = transformedMenuItems || [];

  return (
    <div>
      <Box sx={{ height: "100vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              textAlign: "left",
            },
            "& .MuiDataGrid-columnHeader[data-field='actions']": {
              marginRight: "50px", // Adjust this value as needed
              // Alternatively, use textAlign if you want to align the text
            },
            "& .MuiDataGrid-cell": {
              textAlign: "left",
            },
            "& .MuiDataGrid-cell[data-field='actions']": {
              marginRight: "40px", // Adjust this value as needed
              // Alternatively, use textAlign if you want to align the text
            },
            "& .MuiDataGrid-footerContainer": {
              display: "none", // Hide pagination controls
            },
          }}
        />
      </Box>
      {selectedProduct && isViewDialogOpen && (
        <ViewItem
          product={selectedProduct}
          open={isViewDialogOpen}
          handleClose={handleCloseViewDialog}
        />
      )}

      {selectedProduct && isDeleteDialogOpen && (
        <DeleteItem
          product={selectedProduct}
          open={isDeleteDialogOpen}
          handleClose={handleCloseDeleteDialog}
          onConfirmDelete={handleDeleteConfirmation}
        />
      )}
    </div>
  );
}
