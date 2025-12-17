import React from "react";
import ReactDOM from "react-dom/client";
import VærApp from "./vaermeldingsapp/App.jsx"; // riktig path til App.jsx

const root = ReactDOM.createRoot(document.getElementById("root")); // Oppretter root for React-applikasjonen
root.render( 
  <React.StrictMode>
    <VærApp /> 
  </React.StrictMode>
);
