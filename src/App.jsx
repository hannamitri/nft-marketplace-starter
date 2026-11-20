import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// AOS ANIMATION LIBRARY
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  // INITIALIZE ANIMATIONS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <Router>
      <Nav />

      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* EXPLORE PAGE */}
        <Route path="/explore" element={<Explore />} />

        {/* DYNAMIC AUTHOR PAGES */}
        <Route path="/author" element={<Author />} />
        <Route path="/author/:id" element={<Author />} />

        {/* NFT ITEM DETAILS */}
        <Route path="/item-details" element={<ItemDetails />} />

        {/* DYNAMIC NFT ITEM DETAILS */}
        <Route path="/item-details/:id" element={<ItemDetails />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;