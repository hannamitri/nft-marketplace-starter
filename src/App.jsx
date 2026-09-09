import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <BrowserRouter>
      <SkeletonTheme
        baseColor="#e0e0e0"
        highlightColor="#f5f5f5"
        >

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>

      </SkeletonTheme>
    </BrowserRouter>
  );
}

export default App;
