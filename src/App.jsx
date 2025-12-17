import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import axios from "axios";
import { useState } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';




function App() {
  const [collections, setCollections] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(false)

  Aos.init();

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

  async function getExploreItems(){
    setLoading(true);
    await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/explore')
      .then(res =>{
        const response= res.data;
        setExploreItems(response);
        setLoading(false);
      })
      .catch(err =>{
        console.log('error retrieving data', err);
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
        <Route path="/explore" 
          element={<Explore getExploreItems={getExploreItems}
                    setExploreItems={setExploreItems}
                    exploreItems={exploreItems}
                    loading={loading}
                    setLoading={setLoading}/>} />
        <Route path="/author/:id" 
          element={<Author loading={loading}
                    setLoading={setLoading} />} />
        <Route path="/item-details/:id" 
          element={<ItemDetails loading={loading}
                    setLoading={setLoading} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
