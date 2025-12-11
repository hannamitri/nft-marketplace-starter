import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import axios from "axios";
import { useState } from "react";


function App() {
  const [collections, setCollections] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(false)


  async function getNewItems(){
    setLoading(true)
    await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
      .then(res =>{
        const response = res.data;
        setNewItems(response);
        setLoading(false);
      })
      .catch(err =>{
        console.log('error fetching new items', err);
        setLoading(false);
      })
  }

  async function getCollections(){
    setLoading(true)
    await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then(res =>{
        const response = res.data;
        setCollections(response);
        setLoading(false)
      })
      .catch(err =>{
        console.log('error fetching collections', err);
      })
  }

  async function getTopSellers(){
     setLoading(true)
    await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
      .then(res =>{
        const response = res.data;
        setTopSellers(response);
        setLoading(false);
      })
      .catch(err =>{
        console.log('error fetching data', err);
      })
  }

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/"  
          element={<Home getCollections={getCollections} 
                    collections={collections} 
                    loading={loading}
                    getNewItems={getNewItems}
                    newItems={newItems}
                    getTopSellers={getTopSellers}
                    topSellers={topSellers}/>}  />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details/:id" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
