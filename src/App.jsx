import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import CollectionDetails from "./pages/CollectionDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: () =>
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/:authorId/author" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
        <Route path="/item-details/:id" element={<ItemDetails />} />
        <Route path="/explore/item/:id" element={<ItemDetails />} />
        <Route path="/collection-details/:id" element={<CollectionDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
