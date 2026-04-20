import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import Skeleton from "../components/UI/Skeleton";

const HOME_SKELETON_MS = 1000;

const HomeSkeleton = () => (
  <div id="wrapper">
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>
      <section className="no-top no-bottom">
        <div className="container">
          <Skeleton width="100%" height="420px" borderRadius="12px" />
        </div>
      </section>
      <section className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 text-center">
              <Skeleton width="60%" height="28px" borderRadius="6px" />
              <div className="mt-3">
                <Skeleton width="100%" height="16px" borderRadius="4px" />
                <Skeleton width="95%" height="16px" borderRadius="4px" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="no-bottom">
        <div className="container">
          <div className="text-center mb-4">
            <Skeleton width="200px" height="28px" borderRadius="6px" />
          </div>
          <div className="row">
            {new Array(4).fill(0).map((_, i) => (
              <div className="col-lg-3 col-md-6 mb-4" key={i}>
                <Skeleton width="100%" height="200px" borderRadius="8px" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="no-bottom">
        <div className="container">
          <div className="text-center mb-4">
            <Skeleton width="180px" height="28px" borderRadius="6px" />
          </div>
          <div className="row">
            {new Array(4).fill(0).map((_, i) => (
              <div className="col-lg-3 col-md-6 mb-4" key={i}>
                <Skeleton width="100%" height="280px" borderRadius="8px" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </div>
);

const Home = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setShowContent(true), HOME_SKELETON_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return <HomeSkeleton />;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections />
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
