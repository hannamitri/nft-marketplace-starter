import React, { useEffect } from 'react';
import Landing from '../components/home/Landing';
import LandingIntro from '../components/home/LandingIntro';
import HotCollections from '../components/home/HotCollections';
import NewItems from '../components/home/NewItems';
import TopSellers from '../components/home/TopSellers';
import BrowseByCategory from '../components/home/BrowseByCategory';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-100 overflow-hidden bg-white">
      {/* Hero Banner Section */}
      <section className="w-100" data-aos="fade-up">
        <Landing />
      </section>

      {/* Intro Feature Boxes Section */}
      <section className="w-100" data-aos="fade-up">
        <LandingIntro />
      </section>

      {/* Hot Collections Carousel */}
      <section className="w-100" data-aos="fade-up">
        <HotCollections />
      </section>

      {/* New Items Carousel */}
      <section className="w-100" data-aos="fade-up">
        <NewItems />
      </section>

      {/* Top Sellers Grid */}
      <section className="w-100" data-aos="fade-up">
        <TopSellers />
      </section>

      {/* Browse By Category Section */}
      <section className="w-100" data-aos="fade-up">
        <BrowseByCategory />
      </section>
    </main>
  );
};

export default Home;