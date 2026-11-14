import React, { useEffect } from "react";
import AOS from "aos"; // 1. Add this at the top with your other imports
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh(); // 2. Add this inside your existing useEffect
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />

        <div data-aos="fade-up">
          <HotCollections />
        </div>

        <div data-aos="fade-up">
          <NewItems />
        </div>

        <div data-aos="fade-up">
          <TopSellers />
        </div>

        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
