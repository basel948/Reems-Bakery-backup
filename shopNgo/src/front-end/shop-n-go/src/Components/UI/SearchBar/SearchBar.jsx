import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useTranslation } from "react-i18next";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t, i18n } = useTranslation();

  const [showPlaceholder, setShowPlaceholder] = useState(
    i18n.language === "ar" ? "البحث..." : "חפש..."
  );

  const handleSearch = (e) => {
    onSearch(searchTerm); // This line calls the function passed as a prop
  };

  const handleFocus = () => {
    setShowPlaceholder(""); // Remove placeholder text when input is focused
  };

  const handleBlur = () => {
    setShowPlaceholder(i18n.language === "ar" ? "البحث..." : "חפש..."); // Restore placeholder text when input loses focus
  };

  return (
    <div className={styles["center-container"]}>
      <div className={styles["search-container"]}>
        <input
          className={styles["search-input"]}
          type="text"
          placeholder={showPlaceholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value); // This will make it reactive
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button className={styles["search-icon"]} onClick={handleSearch}>
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
