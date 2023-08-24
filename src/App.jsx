import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";



const options = {
  items: 4,
  nav: true,
  loop: true,
  dots: false,
  lazyLoad: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    768: {
      items: 3
    },
    1200: {
      items: 4
    },
    1400: {
      items: 4
    },

  }


}


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home options={options} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
