import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = ({collections, getCollections, loading, getNewItems, newItems, getTopSellers, topSellers}) => {
  useEffect(() => {
    getCollections();
    getNewItems();
    getTopSellers();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections collections={collections} loading={loading}/>
        <NewItems  newItems={newItems} loading={loading}/>
        <TopSellers topSellers={topSellers} loading={loading}/>
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
