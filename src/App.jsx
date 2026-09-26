import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,   // Smooth 1-second fade
      once: false,      // Allows animations to re-trigger when scrolling back up/down
      mirror: true,     // Animates elements out when scrolling past them
      offset: 100,      // Triggers 100px before reaching the element
    });
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/author/:authorId" element={<Author />} />
        
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/item-details/:id" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

