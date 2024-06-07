import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import AppProvider from "./AppProvider";
import "./style/dark.scss";
import { DarkModeContext } from "./context/darkModeContext";
const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
