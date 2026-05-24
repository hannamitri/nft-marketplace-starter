import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import Explore from "./Explore";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mainBody">
      <div data-aos="fade-up">
        <Landing />
      </div>
      <div data-aos="fade-up">
        <LandingIntro />
      </div>
      <div data-aos="fade-up">
        <HotCollections />
      </div>
      <div data-aos="fade-up">
        <NewItems />
      </div>
      <div data-aos="fade-up">
        <TopSellers />
      </div>
      <div data-aos="fade-left">
        <BrowseByCategory />
      </div>
      <div data-aos="fade-up">
        <Explore />
      </div>
    </div>
  );
};

export default Home;
