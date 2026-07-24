import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AOS from 'aos'
import { useEffect, useState } from "react";

function App() {
  
  const [collections, setCollections] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [topSellers, setTopSellers] = useState([]);

  AOS.init();

  async function getCollections(){
    console.log("Fetching collections");
    let collectionRequest = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
    let collectionRequestJSON = await collectionRequest.json();
    //console.log(collectionRequestJSON);
    setCollections(collectionRequestJSON);
  }

  async function getNewItems(){
    console.log("Fetching new items");
    let newItemRequest = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    let newItemRequestJSON = await newItemRequest.json();
    //console.log(newItemRequestJSON);
    setNewItems(newItemRequestJSON);
  }

  async function getTopSellers(){
    console.log("Fetching new items");
    let sellersRequest = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
    let sellersRequestJSON = await sellersRequest.json();
    //console.log(newItemRequestJSON);
    setTopSellers(sellersRequestJSON);
  }


  //DEPRECATED IN FAVOR OF ENDPOINT MADE FOR THIS PURPOSE, PREVIOUSLY USED TO RETRIEVE ITEMS FROM ALL ENDPOINTS
  /*async function getAllItems(){
    console.log("Getting all items");
    let collectionRequest = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
    let collectionRequestJSON = await collectionRequest.json();
    let exploreRequest = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
    let exploreRequestJSON = await exploreRequest.json();
    let newItemRequest = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    let newItemRequestJSON = await newItemRequest.json();

    setAllItems(collectionRequestJSON.concat(exploreRequestJSON).concat(newItemRequestJSON));
  }*/

  useEffect(() => {
    setTimeout(() => {
      getCollections();
      getNewItems();
      getTopSellers();
    }, 1000);

    
    
  }, [])
  
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home collections = {collections} newItems = {newItems} topSellers={topSellers} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details/:id" element={<ItemDetails  />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
