import React from "react";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import BrowseByCategory from "../components/home/BrowseByCategory";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import HotCollections from "../components/home/HotCollections"; // yo uso solo esta

export default function Home() {
  return (
    <>
      <Landing />
      <LandingIntro />
      <HotCollections />   {/* yo muestro “Hot Collections” aquí */}
      <NewItems />
      <BrowseByCategory />
      <TopSellers />
    </>
  );
}
