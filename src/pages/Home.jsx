import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
    AOS.refresh();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
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
        <div data-aos="fade-up">
          <BrowseByCategory />
        </div>
      </div>
    </div>
  );
};

export default Home;
