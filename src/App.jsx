import { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import RouteSkeleton from "./components/UI/RouteSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const AppContent = () => {
  const location = useLocation();
  const [isRouteLoading, setIsRouteLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1050,
      easing: "ease-out-cubic",
      once: true,
      offset: 70,
    });
  }, []);

  useEffect(() => {
    setIsRouteLoading(true);
    const timeoutId = setTimeout(() => {
      setIsRouteLoading(false);
      AOS.refresh();
    }, 320);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  const getRouteSkeletonVariant = (path) => {
    if (path.startsWith("/item-details")) return "item-details";
    if (path.startsWith("/author")) return "author";
    if (path === "/explore") return "explore";
    return "home";
  };

  const routeSkeletonVariant = getRouteSkeletonVariant(location.pathname);

  return (
    <>
      <Nav />
      {isRouteLoading ? (
        <RouteSkeleton variant={routeSkeletonVariant} />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/author" element={<Author />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/item-details/:id" element={<ItemDetails />} />
          <Route path="/item-details" element={<ItemDetails />} />
        </Routes>
      )}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
