import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/author" element={<Author />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/item-details" element={<ItemDetails />} />
          <Route path="/item-details/:id" element={<ItemDetails />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;