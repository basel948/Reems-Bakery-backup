// Import required packages and components
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./FanFavouriteItems.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import SlpashScreen from "../SplashScreen/SlpashScreen";

function FanFavouriteItems({ currentProduct }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    if (categories && currentProduct) {
      const flattenedMenuItems = categories.flatMap((cat) =>
        cat.menuItems.map((item) => ({
          ...item,
          categoryName_AR: cat.name_AR,
          categoryName_HE: cat.name_HE,
        }))
      );

      const related = flattenedMenuItems.filter(
        (item) =>
          item.categoryName_AR === currentProduct.categoryName_AR ||
          item.categoryName_HE === currentProduct.categoryName_HE
      );

      setRelatedProducts(related);
    }
  }, [currentProduct, categories]);

  useEffect(() => {
    const flattenedMenuItems = categories.flatMap((cat) =>
      cat.menuItems.map((item) => ({
        ...item,
        categoryName_AR: cat.name_AR,
        categoryName_HE: cat.name_HE,
      }))
    );

    const sortedMenuItems = flattenedMenuItems.sort(
      (a, b) => b.numberOfPurchases - a.numberOfPurchases
    );

    const favorite = sortedMenuItems.slice(0, 10);
    setFavoriteProducts(favorite);
  }, [categories]);

  const relatedScrollContainerRef = useRef(null);
  const favoriteScrollContainerRef = useRef(null);

  const scroll = (direction, ref) => {
    if (ref.current) {
      const container = ref.current;
      let scrollAmount = 0;
      const slideTimer = setInterval(function () {
        if (direction === "left") {
          container.scrollLeft -= 10;
        } else {
          container.scrollLeft += 10;
        }
        scrollAmount += 10;
        if (scrollAmount >= 100) {
          window.clearInterval(slideTimer);
        }
      }, 25);
    }
  };

  const GoToProductDetails = (product) => {
    navigate(`/productDetails/${product.id}`, { state: { product } });
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["section"]}>
        <h2 id="related-items"> {t("FanFavouriteItems.related-items")}</h2>
        <button
          className={styles["arrow"]}
          onClick={() => scroll("right", relatedScrollContainerRef)}
        >
          <IoIosArrowForward size={25} />
        </button>
        <div
          className={styles["cardsContainer"]}
          ref={relatedScrollContainerRef}
        >
          {relatedProducts ? (
            relatedProducts.map((product, index) => (
              <div
                key={index}
                className={styles["menuItemCard"]}
                onClick={() => {
                  GoToProductDetails(product);
                }}
              >
                <img
                  src={`http://localhost:8080/api/auth/MenuItemsImages/${product.imagePaths[1]}`}
                  alt={
                    i18n.language === "ar" ? product.name_AR : product.name_HE
                  }
                />
                <span className={styles["productName"]}>
                  {i18n.language === "ar" ? product.name_AR : product.name_HE}
                </span>
                <br></br>
                <span className={styles["productPrice"]}>
                  {product.price} ₪
                </span>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <button
          className={styles["arrow"]}
          onClick={() => scroll("left", relatedScrollContainerRef)}
        >
          <IoIosArrowBack size={25} />
        </button>
      </div>
      <div className={styles["section"]}>
        <h2 id="favorite-items"> {t("FanFavouriteItems.favorite-items")}</h2>
        <button
          className={styles["arrow"]}
          onClick={() => scroll("right", favoriteScrollContainerRef)}
        >
          <IoIosArrowForward size={25} />
        </button>
        <div
          className={styles["cardsContainer"]}
          ref={favoriteScrollContainerRef}
        >
          {favoriteProducts.map((product, index) => (
            <div
              key={index}
              className={styles["menuItemCard"]}
              onClick={() => {
                GoToProductDetails(product);
              }}
            >
              <img
                src={`http://localhost:8080/api/auth/MenuItemsImages/${product.imagePaths[2]}`}
                alt={i18n.language === "ar" ? product.name_AR : product.name_HE}
              />
              <span className={styles["productName"]}>
                {i18n.language === "ar" ? product.name_AR : product.name_HE}
              </span>
              <br></br>
              <span className={styles["productPrice"]}>{product.price} ₪</span>
            </div>
          ))}
        </div>
        <button
          className={styles["arrow"]}
          onClick={() => scroll("left", favoriteScrollContainerRef)}
        >
          <IoIosArrowBack size={25} />
        </button>
      </div>
    </div>
  );
}

export default FanFavouriteItems;
