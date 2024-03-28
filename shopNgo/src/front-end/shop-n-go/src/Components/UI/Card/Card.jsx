import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { useTranslation } from "react-i18next";

const Card = ({ product }) => {
  let navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const findOutMoreHandler = () => {
    //navigting to the productDetails component and passing the product with me
    navigate(`/productDetails/${product.id}`, { state: { product } });
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={`http://localhost:8080/api/auth/MenuItemsImages/${product.imagePaths[1]}`}
          alt={product.name_AR}
          className={styles.image}
        />
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.title}>
          {i18n.language === "ar" ? product.name_AR : product.name_HE}
        </div>
        <div className={styles.findOutMore} onClick={findOutMoreHandler}>
          {t("Card.Show-More")}
        </div>
      </div>
    </div>
  );
};

export default Card;
