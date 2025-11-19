import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import HotCollectionsCarousel from "../components/home/HotCollectionsCarousel";
import HomeSkeleton from "./HomeSkelleton";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate loading delay to show skeleton
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay, adjust as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <HomeSkeleton />;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Main Sections */}
        <Landing />
        <LandingIntro />
        <HotCollectionsCarousel />
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;

