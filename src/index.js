import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { GlobalStyles } from "./constants/globalStyles";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);
