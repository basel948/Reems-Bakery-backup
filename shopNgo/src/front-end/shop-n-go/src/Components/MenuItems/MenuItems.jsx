// Importing necessary modules, components, and styles
import React, { useEffect, useState, useContext } from "react";
import SearchBar from "../UI/SearchBar/SearchBar";
import styles from "./MenuItems.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppProvider";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";

// MenuItems component definition
function MenuItems() {
  // Hook for navigation and access to global state
  let navigate = useNavigate();
  const { categories = [] } = useContext(AppContext);
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

  // Component rendering
  return (
    <div className={styles["container"]}>
      <Navbar isTransparent={false} />
      <h1 style={{ marginTop: "100px" }}>My Menu Items Page</h1>
      <SearchBar onSearch={handleSearch} />

      {isSearching ? (
        // Render search results if searching
        <div className={styles["cardsContainer"]}>
          {/* Map through search results and render each item */}
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
        // Render all categories if selected
        categories.map((cat, catIndex) => (
          // Map through each category and render its items
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
        // Render items for a specific category
        <div className={styles["menuItemsContainer"]}>
          {/* Render category title and items */}
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
