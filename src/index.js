import React from "react";
import ReactDOM from "react-dom";
import jQuery from "jquery"; 

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

window.jQuery = window.$ = jQuery;


ReactDOM.render(
    <App />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
