import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import HotCollectionsCarousel from "../components/home/HotCollectionsCarousel";
import HomeSkeleton from "./HomeSkelleton";

// AOS IMPORTS
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Initialize AOS animations
    AOS.init({
      duration: 800,      // animation speed
      once: true,         // animation happens only once
      easing: "ease-in-out",
    });

    // Refresh AOS on load
    AOS.refresh();

    // Fake loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <HomeSkeleton />;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Animate each section */}
        <div data-aos="fade-up">
          <Landing />
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <LandingIntro />
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <HotCollectionsCarousel />
        </div>

        <div data-aos="fade-up" data-aos-delay="300">
          <NewItems />
        </div>

        <div data-aos="fade-up" data-aos-delay="400">
          <TopSellers />
        </div>

        <div data-aos="fade-up" data-aos-delay="500">
          <BrowseByCategory />
        </div>
      </div>
    </div>
  );
};

export default Home;

