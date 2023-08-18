import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  // Skeleton Loading States
  const [hotCollectionsLoading, setHotCollectionsLoading] = useState(false);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [topSellersLoading, setTopSellersLoading] = useState(false);
  const [exploreItemsLoading, setExploreItemsLoading] = useState(false);

  // Hot Collections Response
  const [hotCollectionsUsersData, sethotCollectionsUsersData] = useState([]);
  async function hotCollectionsResponse() {
    setHotCollectionsLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    sethotCollectionsUsersData(data);
    setTimeout(() => {
      setHotCollectionsLoading(false);
    }, 500);
  }

  // New Items Response
  const [newItemsUsersData, setNewItemsUsersData] = useState([]);
  async function newItemsResponse() {
    setNewItemsLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setNewItemsUsersData(data);
    setTimeout(() => {
      setNewItemsLoading(false);
    }, 500);
  }

  // Top Sellers Response
  const [topSellersUsersData, setTopSellersUsersData] = useState([]);
  async function topSellersResponse() {
    setTopSellersLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setTopSellersUsersData(data);
    setTimeout(() => {
      setTopSellersLoading(false);
    }, 500);
  }

  // Explore Items Response
  const [exploreItemsUsersData, setExploreItemsUsersData] = useState([]);
  async function exploreItemsResponse() {
    setExploreItemsLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    setExploreItemsUsersData(data);
    setExploreItemsLoading(false);
  }

  // Owl-Carousel Re-usable Options
  const owlCarouselPresets = {
    loop: true,
    margin: 10,
    nav: true,
    responsiveClass: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
      1400: {
        items: 4,
      },
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    hotCollectionsResponse();
    newItemsResponse();
    topSellersResponse();
    exploreItemsResponse();
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              owlCarouselPresets={owlCarouselPresets}
              hotCollectionsUsersData={hotCollectionsUsersData}
              hotCollectionsLoading={hotCollectionsLoading}
              newItemsUsersData={newItemsUsersData}
              newItemsLoading={newItemsLoading}
              topSellersUsersData={topSellersUsersData}
              topSellersLoading={topSellersLoading}
            />
          }
        />
        <Route
          path="/explore"
          element={
            <Explore
              exploreItemsUsersData={exploreItemsUsersData}
              setExploreItemsUsersData={setExploreItemsUsersData}
              exploreItemsLoading={exploreItemsLoading}
              setExploreItemsLoading={setExploreItemsLoading}
            />
          }
        />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details/:authorId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
