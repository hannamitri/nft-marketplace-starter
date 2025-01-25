import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

const HotCollections = () => {
  const [data, setData] = useState([]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function fetchData() {
    try {
      const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      
    console.log(response.data)
    setData(response.data)
    
    } catch (error) {
      if (error.response) {
        console.error('Error Data:' + error.response.data)
      } else if (error.request) {
        console.error('Error Request:' + error.request)
      } else {
        console.error('Error:', error.message)
      }
    }
    
  }

  useEffect(() => {
    fetchData()
  }, []);
 
  
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
          <Slider>

          {data.map((card) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={card.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={card.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={card.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{card.title}</h4>
                  </Link>
                  <span>ERC-{card.code}</span>
                </div>
              </div>
            </div>
          ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
