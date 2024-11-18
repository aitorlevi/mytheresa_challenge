import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.scss";
import AlertProvider from "./contexts/AlertContext.jsx";
import LoadingProvider from "./contexts/LoadingContext.jsx";

createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <AlertProvider>
      <App />
    </AlertProvider>
  </LoadingProvider>
);
