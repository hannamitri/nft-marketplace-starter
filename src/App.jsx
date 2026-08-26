import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";


function App() {
    const [collections, setCollections] = useState([]);
  
    useEffect(() => {
  async function fetchCollections() {
    const response = await fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );

    const data = await response.json();

    setCollections(data);
  }

  fetchCollections();
}, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
