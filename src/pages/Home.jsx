import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Landing */}
        <div data-aos="fade-up">
          <Landing />
        </div>

        {/* Landing Intro */}
        <div data-aos="fade-up" data-aos-delay="100">
          <LandingIntro />
        </div>

        {/* Hot Collections */}
        <div data-aos="fade-up" data-aos-delay="150">
          <HotCollections />
        </div>

        {/* New Items */}
        <div data-aos="fade-up" data-aos-delay="200">
          <NewItems />
        </div>

        {/* Top Sellers */}
        <div data-aos="fade-up" data-aos-delay="250">
          <TopSellers />
        </div>

        {/* Browse By Category */}
        <div data-aos="fade-up" data-aos-delay="300">
          <BrowseByCategory />
        </div>
      </div>
    </div>
  );
};

export default Home;