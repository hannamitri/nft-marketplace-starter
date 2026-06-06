import React from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        
        {/* 1. Hero landing pops in instantly on page load */}
        <div data-aos="fade-up">
          <Landing />
        </div>

        {/* 2. Intro steps fade in slightly after */}
        <div data-aos="fade-up" data-aos-delay="100">
          <LandingIntro />
        </div>

        {/* 3. Carousels/Grids slide in from the sides on scroll */}
        <div data-aos="fade-right">
          <HotCollections />
        </div>

        <div data-aos="fade-left">
          <NewItems />
        </div>

        <div data-aos="fade-up">
          <TopSellers />
        </div>

        <div data-aos="zoom-in">
          <BrowseByCategory />
        </div>
        
      </div>
    </div>
  );
};

export default Home;