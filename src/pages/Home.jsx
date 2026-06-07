import React, { Suspense, lazy, useEffect } from "react";
const BrowseByCategory = lazy(() => import("../components/home/BrowseByCategory"));
const HotCollections = lazy(() => import("../components/home/HotCollections"));
const Landing = lazy(() => import("../components/home/Landing"));
const LandingIntro = lazy(() => import("../components/home/LandingIntro"));
const NewItems = lazy(() => import("../components/home/NewItems"));
const TopSellers = lazy(() => import("../components/home/TopSellers"));

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
          <Landing />
        </Suspense>
        <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
          <LandingIntro />
        </Suspense>
        <Suspense fallback={<div style={{ padding: 24 }}>Loading collections...</div>}>
          <HotCollections />
        </Suspense>
        <Suspense fallback={<div style={{ padding: 24 }}>Loading items...</div>}>
          <NewItems />
        </Suspense>
        <Suspense fallback={<div style={{ padding: 24 }}>Loading sellers...</div>}>
          <TopSellers />
        </Suspense>
        <Suspense fallback={<div style={{ padding: 24 }}>Loading categories...</div>}>
          <BrowseByCategory />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
