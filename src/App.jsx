import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSRouteSync = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.refreshHard();
  }, [location.pathname]);

  return null;
};

function App() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    AOS.init({
      duration: isMobile ? 520 : 700,
      easing: "ease-out-cubic",
      once: true,
      offset: isMobile ? 30 : 60,
      delay: 0,
      mirror: false,
    });
  }, []);

  return (
    <Router>
      <AOSRouteSync />
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
