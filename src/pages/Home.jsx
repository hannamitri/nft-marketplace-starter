import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import axios from "axios";

const Home = () => {
  const [hotCollections, sethotCollections] = useState([])
  const [loadinghotCollections, setloadinghotCollections] = useState(null)
  const [newItems, setNewItems] = useState([])
  const [newItemsLoading, setNewItemsLoading] = useState(null)
  const [topSellers, settopSellers] = useState([])
  const [loadingtopSellers, setloadingtopSellers] = useState(null)

  const fetchHotCollections = async () => {
    setloadinghotCollections(true)
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");

    sethotCollections(data)
    setloadinghotCollections(false)
  }

  const fetchNewItems = async () => {
    setNewItemsLoading(true)
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data)
    setNewItemsLoading(false)
  };

  const fetchTopSellers = async () => {
    setloadingtopSellers(true)
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    settopSellers(data)
    setloadingtopSellers(false)
  };



  useEffect(() => {
    fetchHotCollections();
    fetchNewItems();
    fetchTopSellers();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections hotCollections={hotCollections} loadinghotCollections={loadinghotCollections}/>
        <NewItems newItems={newItems} newItemsLoading={newItemsLoading} />
        <TopSellers topSellers={topSellers} loadingtopSellers={loadingtopSellers}/>
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
