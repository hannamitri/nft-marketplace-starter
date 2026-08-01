import React, { useEffect } from "react";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const ScrollAnimations = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 60,
      once: true,
      disable: () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  useEffect(() => {
    const refreshTimer = window.setTimeout(() => AOS.refreshHard(), 0);
    return () => window.clearTimeout(refreshTimer);
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollAnimations />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
