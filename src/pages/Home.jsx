import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

//Animations
//Fade up, Fade in.
//Google 'animate on scroll' library
//Add to divs you want to be fancy
//Link in top right goes to github
//Install details in ReadMe...npm install, etc
//npm install --save aos@next
//import AOS from 'aos';
//import 'aos/dist/aos.css';
//then run use effect with Aos.init() inside
//Within div (outside classname) data-aos="fade-right" (or whatever)




const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
