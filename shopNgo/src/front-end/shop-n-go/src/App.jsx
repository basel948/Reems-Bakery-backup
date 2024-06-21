// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenuItems } from "./Redux/features/menuItemsSlice";
import { fetchCategories } from "./Redux/features/categoriesSlice";
import { fetchAllUsers } from "./Redux/features/userSlice";
import AppRouter from "./AppRouter";
import { DarkModeContextProvider } from "./context/darkModeContext";
import "./App.css";
import "./style/dark.scss";
import setupAxiosInterceptors from "./Redux/axiosInterceptor";

const App = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenuItems());
    dispatch(fetchCategories());
    dispatch(fetchAllUsers()); // Fetch all users on startup
    setupAxiosInterceptors(); // Set up Axios interceptors
  }, [dispatch]);

  return (
    <DarkModeContextProvider>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </div>
    </DarkModeContextProvider>
  );
};

export default App;
