import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppStateProvider } from "./hooks/AppStateProvider";
import App from "./App";
import "./styles/global.css";
import "./styles/client.css";
import "./styles/audit-fixes.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
