import Home from "./pages/Home";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [newItemsCards, setNewItemsCards] = useState([]);
  const [topSellers, setTopSellers] = useState([])
  const [exploreItems, setExploreItems] = useState([]);

  async function getCards() {
    const fetchCards = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
    let receiveCards = fetchCards.data;
    return receiveCards;
  }

  async function getNewItems (){
    const fetchNewItems = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
    let receiveNewItems = fetchNewItems.data
    return receiveNewItems
  }

  async function getTopSellers (){
    const fetchTopSellers = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
    let receiveTopSellers = fetchTopSellers.data
    return receiveTopSellers
  }

  async function getExploreItems() {
    const fetchExploreItems = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/explore');
    let receiveExploreItems = fetchExploreItems.data;
    return receiveExploreItems
  }

  useEffect(() => {
    async function fetchData() {
      const receiveCards = await getCards();
      const receiveNewItems = await getNewItems();
      const receiveTopSellers = await getTopSellers();
      const receiveExploreItems = await getExploreItems();
      setCards(receiveCards);
      setNewItemsCards(receiveNewItems);
      setTopSellers(receiveTopSellers);
      setExploreItems(receiveExploreItems);
    }
    fetchData();
  }, []);


  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home cards={cards} newItemsCards={newItemsCards} topSellers={topSellers}/>} />
        <Route path="/explore" element={<Explore exploreItems={exploreItems}/>} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
