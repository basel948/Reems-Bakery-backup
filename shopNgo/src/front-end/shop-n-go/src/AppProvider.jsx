import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [menuItemsData, setMenuItemsData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [translationInProgress, setTranslationInProgress] = useState(false);
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [logoutInProgress, setLogoutInProgress] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");

        const menuItemsResponse = await fetch(
          "http://localhost:8080/api/auth/menuItems"
        );
        if (!menuItemsResponse.ok) {
          throw new Error("Failed to fetch menu items data");
        }
        const menuItemsResult = await menuItemsResponse.json();
        setMenuItemsData(menuItemsResult);

        const categoriesResponse = await fetch(
          "http://localhost:8080/api/auth/category"
        );
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories data");
        }
        const categoriesResult = await categoriesResponse.json();
        setCategories(categoriesResult);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      console.log("Fetching user data...");
      console.log("Token:", token);

      const response = await axios.get(
        "http://localhost:8080/api/auth/users/currentUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User data response status:", response.status);

      if (response.status === 200) {
        console.log("User data fetched successfully");
        console.log("User data:", response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
        setUserData(response.data);
        console.log("User data set in context:", response.data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        menuItemsData,
        categories,
        updateCategories: setCategories,
        translationInProgress,
        setTranslationInProgress,
        loginInProgress,
        setLoginInProgress,
        logoutInProgress,
        setLogoutInProgress,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
