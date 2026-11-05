import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();





const Home = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <div data-aos="fade-up"><Landing /></div>
        <LandingIntro />
        <div className="animated.bounceIn" data-aos="fade-up-right"><HotCollections /></div>
        <div className="bounce" data-aos="fade-up-right"><NewItems /></div>
        <div className="swing" data-aos="fade-up-right"><TopSellers /></div>
        <div className="swing"><BrowseByCategory /></div>
      </div>
    </div>
  );
};

export default Home;
