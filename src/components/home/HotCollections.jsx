import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Slider from "../slider/Slider"


const HotCollections = () => {
  const [hotCollections, setHotCollections] = React.useState([]);

  useEffect(() => {
    axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then(({ data }) => {
        // console.log(data)
        setHotCollections(data);
      })
  }, [])


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>


          <Slider data={hotCollections} />


        </div>
      </div>
    </section>
  );
};

export default HotCollections;
