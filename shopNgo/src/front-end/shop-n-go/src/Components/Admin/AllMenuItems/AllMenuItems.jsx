import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./AllMenuItems.module.css";
import ViewItem from "../ViewItem/ViewItem";
import Swal from "sweetalert2";
import axios from "axios";
import { updateCategories } from "../../../Redux/features/categoriesSlice"; // Import the action to update categories
import { useTranslation } from "react-i18next";
import StandartSwalAlert from "../../UI/SwalAlert/StandartSwalAlert";

export default function AllMenuItems() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);

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
  };

  const deleteItemHandler = (item) => {
    setSelectedProduct(item);
    StandartSwalAlert({
      title: t("Dialoges.confirmDeletionTitle"),
      // titleText: t("Dialoges.dialoge-description2", { itemName: item.name_AR }),
      titleText: t("Dialoges.confirmDeletionText"),
      icon: "warning",
      showConfirmButton: t("Dialoges.delete"),
      showCancelButton: t("Dialoges.cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteConfirmation();
      }
    });
  };

  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/menuItems/${selectedProduct.id}`
      );

      StandartSwalAlert({
        title: t("Dialoges.deleteTitle"),
        titleText: t("Dialoges.deletedItem"),
        icon: "success",
      });

      // Update categories state to reflect the deletion
      const updatedCategories = categories.map((category) => {
        return {
          ...category,
          menuItems: category.menuItems.filter(
            (item) => item.id !== selectedProduct.id
          ),
        };
      });
      dispatch(updateCategories(updatedCategories)); // Dispatch the action to update categories in the store

      // Update local storage
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    } catch (error) {
      StandartSwalAlert({
        title: t("Dialoges.globalErrorTitle"),
        titleText: t("Dialoges.globalErrorMsg"),
        icon: "error",
      });

      console.error(error);
    }

    // Reset state
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
    </div>
  );
}
