import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import axios from "axios";

const Home = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
      )
      setData(data);
      setLoading(false)
    }
    fetchData()
  },[])


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections data={data} loading={loading}/>
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
