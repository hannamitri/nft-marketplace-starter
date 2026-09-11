import React, { useEffect, useState} from "react";
import axios from "axios";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((response) => {
        console.log("HOT COLLECTIONS DATA:", response.data);
        setHotCollections(response.data);
      })
       .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });   
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections  hotCollections={hotCollections} loading={loading} />
        <NewItems  />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
