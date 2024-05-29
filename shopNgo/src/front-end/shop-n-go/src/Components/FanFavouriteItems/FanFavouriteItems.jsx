// Import required packages and components
import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./FanFavouriteItems.module.css"; // Import custom styles
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"; // Import arrow icons
import SlpashScreen from "../SplashScreen/SlpashScreen";
// Import the AppContext to get application-wide state
import { AppContext } from "../../AppProvider";

// Define the FanFavouriteItems component
function FanFavouriteItems({ currentProduct }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { categories } = useContext(AppContext);

  // Declare state to store related products
  const [relatedProducts, setRelatedProducts] = useState([]);
  // Declare state to store related products
  const [favoriteProducts, setfavoriteProducts] = useState([]);


  // Use useEffect to populate related products when currentProduct changes
  useEffect(() => {
    if (categories && currentProduct) {
      const flattenedMenuItems = categories.flatMap((cat) =>
        cat.menuItems.map((item) => ({
          ...item,
          categoryName_AR: cat.name_AR,
          categoryName_HE: cat.name_HE,
        }))
      );

      // Filter items that have the same category name
      const related = flattenedMenuItems.filter(
        (item) =>
          item.categoryName_AR === currentProduct.categoryName_AR ||
          item.categoryName_HE === currentProduct.categoryName_HE
      );

      setRelatedProducts(related);
    }
  }, [currentProduct, categories]);

  // Use useEffect to populate favorite products ( top 10 most purchased products)
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
    setfavoriteProducts(favorite);
  }, [categories]);

  // Declare useRef hooks for scroll containers
  const relatedScrollContainerRef = useRef(null);
  const favoriteScrollContainerRef = useRef(null);

  // Define the scroll function to scroll the container
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

  // Define the JSX structure of the component
  return (
    <div className={styles["container"]}>
      {/* Main container for the component */}
      <div className={styles["section"]}>
        {/* Section for related products */}
        {/* Title for the related products section */}
        <h2 id="related-items"> {t("FanFavouriteItems.related-items")}</h2>
        <button
          className={styles["arrow"]}
          onClick={() => scroll("right", relatedScrollContainerRef)}
        >
          {/* Arrow icon for scrolling right */}
          <IoIosArrowForward size={25} />
        </button>
        <div
          className={styles["cardsContainer"]}
          ref={relatedScrollContainerRef}
        >
          {/* Container for related product cards */}
          {relatedProducts ? (
            relatedProducts.map((product, index) => (
              <div
                key={index}
                className={styles["menuItemCard"]}
                onClick={() => {
                  GoToProductDetails(product);
                }}
              >
                {/* Individual related product card */}
                <img
                  src={`http://localhost:8080/api/auth/MenuItemsImages/${product.imagePaths[1]}`}
                  alt={
                    i18n.language === "ar" ? product.name_AR : product.name_HE
                  }
                />
                {/* Product name */}
                <span className={styles["productName"]}>
                  {i18n.language === "ar" ? product.name_AR : product.name_HE}
                </span>
                <br></br>

                {/* Product price */}
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
          {/* Arrow icon for scrolling left */}
          <IoIosArrowBack size={25} />
        </button>
      </div>
      <div className={styles["section"]}>
        {/* Section for favorite products */}
        {/* Title for the favorite products section */}
        <h2 id="favorite-items"> {t("FanFavouriteItems.favorite-items")}</h2>
        <button
          className={styles["arrow"]}
          onClick={() => scroll("right", favoriteScrollContainerRef)}
        >
          {/* Arrow icon for scrolling right */}
          <IoIosArrowForward size={25} />
        </button>
        <div
          className={styles["cardsContainer"]}
          ref={favoriteScrollContainerRef}
        >
          {/* Container for favorite product cards */}
          {favoriteProducts.map(
            (
              product,
              index // Mapping through relatedProducts to display them as favorite products (this is just for the sake of example)
            ) => (
              <div
                key={index}
                className={styles["menuItemCard"]}
                onClick={() => {
                  GoToProductDetails(product);
                }}
              >
                {/* Individual favorite product card */}
                <img
                  src={`http://localhost:8080/api/auth/MenuItemsImages/${product.imagePaths[2]}`}
                  alt={
                    i18n.language === "ar" ? product.name_AR : product.name_HE
                  }
                />
                {/* Product name */}
                <span className={styles["productName"]}>
                  {i18n.language === "ar" ? product.name_AR : product.name_HE}
                </span>
                {/* Product price */}
                <br></br>
                <span className={styles["productPrice"]}>
                  {product.price} ₪
                </span>
              </div>
            )
          )}
        </div>
        <button
          className={styles["arrow"]}
          onClick={() => scroll("left", favoriteScrollContainerRef)}
        >
          {/* Arrow icon for scrolling left */}
          <IoIosArrowBack size={25} />
        </button>
      </div>
    </div>
  );
}

export default FanFavouriteItems;
