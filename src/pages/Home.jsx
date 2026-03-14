import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import AOS from "aos";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <div data-aos="fade-up">
          <Landing />
        </div>

        <div data-aos="fade-up" data-aos-delay="50">
          <LandingIntro />
        </div>

        <div data-aos="fade-up" data-aos-delay="80">
          <HotCollections />
        </div>

        <div data-aos="fade-up" data-aos-delay="110">
          <NewItems />
        </div>

        <div data-aos="fade-right" data-aos-duration="900">
          <TopSellers />
        </div>

        <div
  data-aos="fade-left"
  data-aos-duration="900"
>
  <BrowseByCategory />
</div>
      </div>
    </div>
  );
};

export default Home;
