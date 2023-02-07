import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton'
import  { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Cardskel from "../UI/Cardskel";



const HotCollections = () => {
  const { nftId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    async function fetchNft(nftId) {
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?nftid=${nftId}`
      );
      setPosts(data);
      setLoading(false);
    }
    fetchNft();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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



        {
          loading
          ?
          (
            new Array(4).fill(0).map((_, index) => (
              <Cardskel></Cardskel>
            ))
          )
          :
          (
<Slider {...settings}>
            {posts.map((nft, index) => (
              // col-lg-3 col-md-6 col-sm-6 col-xs-12
        
              <div  className="" key={index}>
                
                <div className="nft_coll"  >
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={nft.nftImage }  
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp"> 
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={nft.authorImage} 
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{nft.title }  </h4>
                    </Link>
                    <span>ERC-{nft.code  } </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>


           )
       } 
          
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
