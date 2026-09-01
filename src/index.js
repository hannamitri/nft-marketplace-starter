import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 650,
  easing: "ease-out",
  once: true,
  offset: 100,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();