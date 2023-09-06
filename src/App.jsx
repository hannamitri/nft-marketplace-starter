import Home from "./pages/Home";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { getCombinedCollections } from "./api/combineCollections";

function App() {
const [collections, setCollections] = useState([]);


useEffect(() => {
  async function fetchData(){
    try{
      const data = await getCombinedCollections();
      // console.log("Fetched data:", data); // Log the fetched data
      setCollections(data);
    }
    catch(error){
      console.log("Error:", error);
    }
  }
  fetchData();
}, []);


  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details/:id" element={<ItemDetails collections={collections} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
