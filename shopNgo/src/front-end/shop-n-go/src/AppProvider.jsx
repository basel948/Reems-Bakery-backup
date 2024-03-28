import React, { createContext, useState, useEffect, Children } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [menuItemsData, setMenuItemsData] = useState(
    JSON.parse(localStorage.getItem("menuItemsData")) || null
  );
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || null
  );

  // New state for translation progress
  const [translationInProgress, setTranslationInProgress] = useState(false);

  // New 2 states for login and logout progress
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [logoutInProgress, setLogoutInProgress] = useState(false);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userData) {
        const response = await fetch("http://localhost:8080/api/auth/users");
        const result = await response.json();
        localStorage.setItem("userData", JSON.stringify(result));
        setUserData(result);
      }
      if (!menuItemsData) {
        const response = await fetch(
          "http://localhost:8080/api/auth/menuItems"
        );
        const result = await response.json();
        localStorage.setItem("menuItemsData", JSON.stringify(result));
        setMenuItemsData(result);
      }
      if (!categories) {
        const response = await fetch("http://localhost:8080/api/auth/category");
        const result = await response.json();
        localStorage.setItem("categories", JSON.stringify(result));
        setCategories(result);
      }
    };
    fetchData();
  }, []);

  const updateCategories = (newCategories) => {
    const updatedCategories = [...newCategories];
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        menuItemsData,
        categories,
        updateCategories,
        translationInProgress,
        setTranslationInProgress,
        loginInProgress,
        setLoginInProgress,
        logoutInProgress,
        setLogoutInProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default AppProvider;
