import React, { forwardRef, useState, Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useTranslation } from "react-i18next";
import InnerSlider from "../../Slider/InnerSlider";
import styles from "./ViewItem.module.css";

function ViewItem({ product, open, handleClose }) {
  // console.log(product);
  const { t, i18n } = useTranslation();

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  // Create an array of image URLs
  const productImageArray = product.imagePaths.map((imagePath) => {
    return `http://localhost:8080/api/auth/MenuItemsImages/${imagePath}`;
  });

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            bgcolor: "rgba(225, 225, 225, 0.263)",
            marginBottom: "-10px",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="black"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={styles["header"]}>
          <div className={styles["right-section"]}>
            <div className={styles["product-details-top"]}>
              <h3 className={styles["product-category"]}>
                {product.categoryName_AR}
              </h3>
              <h1 className={styles["product-title"]}>{product.name_AR}</h1>
              <h2 className={styles["product-description"]}>
                {product.description_AR}
              </h2>
            </div>
            <div className={styles["product-details-bottom"]}>
              <h3 className={styles["product-price"]}>{product.price} ₪</h3>
            </div>
            <div className={styles["allergies-section"]}>
              <h1 id="allergies">{t("productDetails.allergies")}</h1>
              <h6>
                <span
                  id="product-allergies-contains"
                  className={styles["product-allergies-contains"]}
                >
                  {t("productDetails.product-allergies-contains")}
                </span>
                <span className={styles["product-allergies-components"]}>
                  {product.ingredients_AR.join(" , ")}
                </span>
              </h6>
            </div>
          </div>
          <div className={styles["left-section"]}>
            <InnerSlider productImages={productImageArray} />
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
}

export default ViewItem;
