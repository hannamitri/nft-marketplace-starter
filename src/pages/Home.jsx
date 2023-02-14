import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import axios from "axios";

const Home = () => {
    // This is the state that will hold the data from the API call
    const [getHotCollections, setGetHotCollections] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // This is the API call
    useEffect(() => {
        // This is the API call to the cloud function that returns the data
        axios
            .get(
                "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
            )
            .then((res) => {
                // This is the data from the API call that is being set to the state
                setGetHotCollections(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div id="wrapper">
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                <Landing />
                <LandingIntro />
                <HotCollections getHotCollections={getHotCollections} />
                <NewItems />
                <TopSellers />
                <BrowseByCategory />
            </div>
        </div>
    );
};

export default Home;
