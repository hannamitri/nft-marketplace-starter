import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import CollectionDetails from "./pages/CollectionDetails";
import NewItemDetails from "./pages/NewItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
        <Route path="/item-details/:nftId" element={<CollectionDetails />} />
        <Route path="/item-details/new/:nftId" element={<NewItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
