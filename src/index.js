import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Aos from "aos";
import "aos/dist/aos.css"

Aos.init({
  duration: 1000,
  once: true,
});

// React 17 entry point. If you upgrade to React 18, swap this for:
//   import { createRoot } from "react-dom/client";
//   createRoot(document.getElementById("root")).render(...)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Pass a function to log results (for example: reportWebVitals(console.log)).
reportWebVitals();
