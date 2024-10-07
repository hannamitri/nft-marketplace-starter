import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TopSellers from "./components/home/TopSellers";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/nft/:id" element={<ItemDetails />} /> 
        <Route path="/nft-image" element={<ItemDetails />} /> 
        <Route path="/top-sellers/:top-SellersId" element={<TopSellers />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
