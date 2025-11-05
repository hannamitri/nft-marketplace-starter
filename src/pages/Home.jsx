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

        <section data-aos="zoom-in" data-aos-delay="0" data-aos-anchor-placement="top-bottom">
          <Landing />
        </section>

        <section data-aos="fade-up" data-aos-delay="50" data-aos-anchor-placement="top-bottom">
          <LandingIntro />
        </section>

        <section data-aos="fade-up" data-aos-delay="100" data-aos-anchor-placement="top-bottom">
          <HotCollections />
        </section>

        <section data-aos="fade-up" data-aos-delay="150" data-aos-anchor-placement="top-bottom">
          <NewItems />
        </section>

        <section data-aos="fade-up" data-aos-delay="200" data-aos-anchor-placement="top-bottom">
          <TopSellers />
        </section>

        <section data-aos="fade-right" data-aos-delay="250" data-aos-anchor-placement="top-bottom">
          <BrowseByCategory />
        </section>
      </div>
    </div>
  );
};

export default Home;
