import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [nftHotCollectionsData, setNftHotCollectionsData] = useState([]);
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url);
      setNftHotCollectionsData(response.data);
    }

    fetchData();
  }, [url]);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={<Home nftHotCollectionsData={nftHotCollectionsData} />}
        />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
