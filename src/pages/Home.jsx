import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Scroll to top when the component loads
    window.scrollTo(0, 0);
       // ✅ Initialize AOS
    AOS.init({
      duration: 2000, // animation duration (ms)
      once: true,     // whether animation should happen only once
      easing: "ease-in-out",
    })

      // Optional: refresh AOS if content updates dynamically
    AOS.refresh();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <div data-aos="zoom-in">
        <LandingIntro />
        </div>
        <div data-aos="fade-right">
        <HotCollections />
        </div>
        <div data-aos="fade-left">
        <NewItems />
        </div>
        <div data-aos="flip-right">
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
