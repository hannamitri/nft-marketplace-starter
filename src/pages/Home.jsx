import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSeller";
import PageSkeleton from "../components/home/PageSkeleton";


const Home = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <LandingIntro />
        <HotCollections searchTerm={searchTerm} />
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
