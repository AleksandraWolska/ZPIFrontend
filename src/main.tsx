import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import { keycloak } from "./auth/keycloak";

const renderApp = () =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );

const initializeApp = () => {
  if (process.env.NODE_ENV === "development") {
    keycloak
      .init({
        onLoad: "check-sso",
      })
      .then(() => {
        renderApp();
      });
  } else {
    renderApp();
  }
};

initializeApp();
