import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// Import AOS library and CSS
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  // Initialize AOS when the app loads
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 0, // Tells AOS to trigger hero elements immediately on load
    });
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
