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
  keycloak.init({}).then(() => {
    renderApp();
  });
};

initializeApp();
