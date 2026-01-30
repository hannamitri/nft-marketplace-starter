import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AOS from 'aos';
import 'aos/dist/aos.css';

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "./index.css";

AOS.init({
  duration: 1000,
  once: true,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);