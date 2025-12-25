import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function feachCollections() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
      setCollections(data);
      setLoading(false);
      console.log(data);

    }
    feachCollections();
  }, []);

  const settings = {
    arrows: true,
    slidesToShow: 4,
    infinite: true,
    responsive: [
    {
      breakpoint: 1192, // screen width <= 996px
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768, // screen width <= 768px
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480, // screen width <= 480px
      settings: {
        slidesToShow: 1,
      },
    },
  ],
    
  };

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
          <Slider {...settings}> 
            { loading
               ? new Array(10).fill(0).map((_, index) => (
                   <div style={{ padding: "10px", textAlign: "center" }} key={index}>
                     <Skeleton height={250} style={{ marginBottom: 10 }} />
                     <Skeleton circle height={60} width={60} style={{ margin: "auto", marginBottom: 10 }} />
                     <i className="fa fa-check"></i>
                     <Skeleton width={100} height={20} style={{ margin: "auto", marginBottom: 5 }} />
                     <Skeleton width={60} height={15} style={{ margin: "auto" }} />
                   </div>
                ))
            : collections.map(collection => (
                <div className="nft_coll" key={collection.authorId}>
                  <div className="nft_wrap" >
                    <Link to="/item-details">
                      <img src={collection.nftImage} className="lazy img-fluid" alt=""  />
                    </Link>
                 </div>
                 <div className="nft_coll_pp">
                   <Link to="/author">
                     <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                   </Link>
                   <i className="fa fa-check"></i>
                 </div>
                 <div className="nft_coll_info">
                   <Link to="/explore">
                     <h4>{collection.title}</h4>
                   </Link>
                   <span>ERC-{collection.code}</span>
                 </div>
               </div>
             ))
           }
           </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
