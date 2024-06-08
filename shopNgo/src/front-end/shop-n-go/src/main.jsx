import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import Backend from "i18next-http-backend";
import { Provider } from "react-redux";
import store from "./Redux/store"; // Import the Redux store

// this here is for the tanslation library
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "ar",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Redux Provider */}
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
