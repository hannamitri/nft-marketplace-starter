import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import Home from "./pages/Home";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Explore from "./pages/Explore";   
import AOS from "aos";
import "aos/dist/aos.css";

function App() {

useEffect(() => {
  AOS.init({
    duration: 1000,
    easing: "ease-out-cubic",
    once: false
  });
}, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />   
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item/:itemId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;


