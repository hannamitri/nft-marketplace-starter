import React, { useEffect, useState } from "react";
import axios from "axios";
import NewItemsSlider from "./home-components/NewItemsComponents/NewItemsSlider";
import SkeletonSlider from "./home-components/Skeletons/SkeletonSlider";


const NewItems = () => {
  const [nfts, setNfts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
 
  async function getNFTs(){
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
    setNfts(data)
    setIsLoaded(true)
  }

  useEffect(() => {
    getNFTs()
  },[isLoaded])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container" data-aos = "fade-in" data-aos-duration = "1000" data-aos-delay = "300" data-aos-once="true">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {
            !isLoaded ? (
              <SkeletonSlider/>
            ) : (
              <NewItemsSlider nfts = {nfts}/>
            )
          }

        </div>
      </div>
    </section>
  );
};

export default NewItems;
