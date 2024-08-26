import React, { useEffect, useState } from "react";
import axios from "axios";
import SkeletonLoader from "./home-components/Skeletons/SkeletonHotCollections";
import HotCollectionsSlider from "./home-components/HotCollectionsComponents/HotCollectionsSlider";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const HotCollections = () => {
  const [nfts, setNfts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  async function getNFTs(){
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
    setNfts(data)
    setIsLoaded(true)
  }

  useEffect(() => {
    getNFTs()
  },[isLoaded])


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container" data-aos = "fade-in" data-aos-duration = "1000" data-aos-once="true">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {
            !isLoaded ? (
              <SkeletonLoader/>
            ) : (
              <HotCollectionsSlider nfts = {nfts}/>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
