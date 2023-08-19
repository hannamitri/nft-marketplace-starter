import React from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = ({
  owlCarouselPresets,
  hotCollectionsUsersData,
  hotCollectionsLoading,
  newItemsUsersData,
  newItemsLoading,
  topSellersUsersData,
  topSellersLoading,
}) => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections
          hotCollectionsUsersData={hotCollectionsUsersData}
          hotCollectionsLoading={hotCollectionsLoading}
          owlCarouselPresets={owlCarouselPresets}
        />
        <NewItems
          newItemsUsersData={newItemsUsersData}
          newItemsLoading={newItemsLoading}
          owlCarouselPresets={owlCarouselPresets}
        />
        <TopSellers
          topSellersUsersData={topSellersUsersData}
          topSellersLoading={topSellersLoading}
        />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
