import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Slider from "../slider/Slider"



const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then(({ data }) => {
        setHotCollections(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching hot collections:", error);
        setIsLoading(false);
      });
  }, []);


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-in">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in">Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>


          <Slider data={hotCollections} loading={loading} from={"hotCollections"} />



        </div>
      </div>
    </section>
  );
};

export default HotCollections;
