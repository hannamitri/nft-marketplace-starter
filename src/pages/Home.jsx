import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


const [hotCollectionData, setHotCollectionData] = useState([])
const [hotCollectionLoading, setHotCollectionLoading] = useState(true)
const [newItemsData, setNewItemsData] = useState([])
const [newItemsLoading, setNewItemsLoading] = useState(true)
const [topSellersData, setTopSellersData] = useState([])
const [topSellersLoading, setTopSellersLoading] = useState(true)

async function fetchHotCollections() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setHotCollectionData(response.data);
        setHotCollectionLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setHotCollectionLoading(false);
      }
    }

async function fetchNewItems() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setNewItemsData(response.data);
        setNewItemsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNewItemsLoading(false);
      }
    }

    async function fetchtopSellers() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        );
        setTopSellersData(response.data);
        setTopSellersLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTopSellersLoading(false);
      }
    }

  useEffect(() => {
    fetchHotCollections();
    fetchNewItems();
    fetchtopSellers();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections data={hotCollectionData} loading={hotCollectionLoading} />
        <NewItems data={newItemsData} loading={newItemsLoading} />
        <TopSellers data={topSellersData} loading={topSellersLoading} />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
