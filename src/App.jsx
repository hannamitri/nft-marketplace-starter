import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";

function App() {

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true
      // Any comment 
    });
  }, [])

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details/:id" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
