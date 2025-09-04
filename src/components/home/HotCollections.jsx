import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import CustomArrows from "./slider";
import { Carousel } from "react-bootstrap";
import Loadingstate from "../Loadingstate";

const HotCollections = () => {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApi();
  }, []);

  async function fetchApi() {
    setLoading(true)
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setApi(data);
    setLoading(false)
   
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row"  data-aos="fade-up"
         data-aos-easing="ease-in-out"
              data-aos-duration="800">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? 
            <Loadingstate array={4}/>
            
           : (
            <CustomArrows />
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
