// Import necessary modules, components, hooks, and styles
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MenuItems.module.css";
import { useTranslation } from "react-i18next";
import SearchBar from "../UI/SearchBar/SearchBar";
import Navbar from "../Navbar/Navbar";

// MenuItems component definition
function MenuItems() {
  let navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const { t, i18n } = useTranslation();

  // Retrieve query parameters from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = decodeURIComponent(query.get("category"));

  // State for managing search and displayed items
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);

  // Effect to handle category-based item filtering
  useEffect(() => {
    if (category === "كل القائمة" || category === "כל התפריט") {
      const allItems = categories.flatMap((cat) =>
        cat.menuItems.map((menuItem) => ({
          ...menuItem,
          categoryName: cat.name_AR,
        }))
      );
      setCategoryItems(allItems);
    } else {
      const filteredCategory = categories.find((cat) =>
        i18n.language === "ar"
          ? cat.name_AR === category
          : cat.name_HE === category
      );
      if (filteredCategory) {
        const itemsWithCategory = filteredCategory.menuItems.map(
          (menuItem) => ({ ...menuItem, categoryName: filteredCategory.name })
        );
        setCategoryItems(itemsWithCategory);
      }
    }
  }, [category, categories, i18n.language]);

  // Search handling
  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filteredItems = categories.flatMap((cat) =>
        cat.menuItems.filter(
          (product) =>
            product.name_AR.includes(searchTerm) ||
            product.name_HE.includes(searchTerm)
        )
      );
      setSearchResults(filteredItems);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  // Navigate to product details page
  const GoToProductDetails = (productItem) => {
    categoryItems.forEach((product) => {
      if (product.id === productItem.id) {
        navigate(`/productDetails/${product.id}`, { state: { product } });
      }
    });
  };

  return (
    <div className={styles["container"]}>
      <Navbar isTransparent={false} />
      <h1 style={{ marginTop: "100px" }}>My Menu Items Page</h1>
      <SearchBar onSearch={handleSearch} />

      {isSearching ? (
        <div className={styles["cardsContainer"]}>
          {searchResults.map((product, index) => (
            <div
              key={index}
              className={`${styles["menuItemCard"]}`}
              onClick={() => GoToProductDetails(product)}
            >
              <img
                src={`http://localhost:8080/api/auth/MenuItemsImages/${product.imagePaths[1]}`}
                alt={i18n.language === "ar" ? product.name_AR : product.name_HE}
              />
              <div className={styles["menuItemName"]}>
                {i18n.language === "ar" ? product.name_AR : product.name_HE}
              </div>
              <div className={styles["menuItemDescription"]}>
                {i18n.language === "ar"
                  ? product.description_AR
                  : product.description_HE}
              </div>
              <div className={styles["menuItemPrice"]}>₪{product.price}</div>
            </div>
          ))}
        </div>
      ) : category === "كل القائمة" ? (
        categories.map((cat, catIndex) => (
          <div key={catIndex} className={styles["menuItemsContainer"]}>
            <div className={styles["categoryTitleContainer"]}>
              <h1 className={styles["categoryTitle"]}>
                {i18n.language === "ar" ? cat.name_AR : name_HE}
              </h1>
              <div className={styles["titleLine"]}></div>
            </div>
            <div className={styles["cardsContainer"]}>
              {cat.menuItems.map((product, index) => (
                <div
                  key={index}
                  className={styles["menuItemCard"]}
                  onClick={() => GoToProductDetails(product)}
                >
                  <img
                    src={`http://localhost:8080/api/auth/MenuItemsImages/${product.imagePaths[1]}`}
                    alt={
                      i18n.language === "ar" ? product.name_AR : product.name_HE
                    }
                  />
                  <div className={styles["menuItemName"]}>
                    {i18n.language === "ar" ? product.name_AR : product.name_HE}
                  </div>
                  <div className={styles["menuItemDescription"]}>
                    {i18n.language === "ar"
                      ? product.description_AR
                      : product.description_HE}
                  </div>
                  <div className={styles["menuItemPrice"]}>
                    ₪{product.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className={styles["menuItemsContainer"]}>
          <div className={styles["categoryTitleContainer"]}>
            <h1 className={styles["categoryTitle"]}>{category}</h1>
            <div className={styles["titleLine"]}></div>
          </div>
          <div className={styles["cardsContainer"]}>
            {categoryItems.map((product, index) => (
              <div
                key={index}
                className={styles["menuItemCard"]}
                onClick={() => GoToProductDetails(product)}
              >
                <img
                  src={`http://localhost:8080/api/auth/MenuItemsImages/${product.imagePaths[1]}`}
                  alt={product.name}
                />
                <div className={styles["menuItemName"]}>
                  {i18n.language === "ar" ? product.name_AR : product.name_HE}
                </div>
                <div className={styles["menuItemDescription"]}>
                  {i18n.language === "ar"
                    ? product.description_AR
                    : product.description_HE}
                </div>
                <div className={styles["menuItemPrice"]}>₪{product.price}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default MenuItems;
