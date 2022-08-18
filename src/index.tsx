import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "tailwindcss/tailwind.css";
import "./style.css";

ReactDOM.render(
  <React.StrictMode>
    <App width="100%" height={500} />
  </React.StrictMode>,
  document.getElementById("root")
);
