import React from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import { ExploreNftsProvider } from "../context/ExploreNftsContext";
import { useScrollRestoration } from "../hooks/useScrollRestoration";

const Home = () => {
  useScrollRestoration();

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <ExploreNftsProvider>
          <HotCollections />
          <NewItems />
          <TopSellers />
        </ExploreNftsProvider>
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
