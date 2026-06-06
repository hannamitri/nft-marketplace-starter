import React, { useEffect } from "react"; // <-- FIXED: Added { useEffect } here
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; 

import AOS from "aos";
import "aos/dist/aos.css"; 



function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,     
      once: true,        
      easing: "ease-out",
      startEvent: "DOMContentLoaded", // Forces immediate evaluation
      useClassNames: false
    
    });
  }, []);

  return (
    <Router>
      <ScrollToTop /> 
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