import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Skeleton from "../UI/Skeleton";


const HotCollections = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [nftObjects, setNftObjects] = useState ({})

  const [loading, setLoading] = useState (true)

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",filter: "invert()" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", filter: "invert()" }}
        onClick={onClick}
      />
    );
  }
  


  async function FetchApi () {
    setLoading(true);
    try {
      const  apiData  = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections') 
      setNftObjects(apiData.data)
      console.log (apiData)
      setLoading(false);
      }
      catch (error) {
        console.error ('Error fetching NFTs:',  error);
        setLoading(true);
      }
    }

    useEffect(() => {
     FetchApi()
    },[])


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
         
          {loading ? ( <Slider {...settings}>

            {new Array(4).fill(0).map((_, index) => (
              <div
                className="col-lg-12 col-md-12 col-sm-10 col-xs-12"
                key={index}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <Skeleton width={'100%'} height={200}></Skeleton>
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <Skeleton width={50} height={50} borderRadius={50}></Skeleton>
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info" style={{ display: 'flex', flexDirection: 'column' }}>
                    <Link to="/explore">
                      <Skeleton width={100} height={20}></Skeleton>
                    </Link>
                    <span>
                      <Skeleton width={60} height={20}></Skeleton>

                    </span>
                  </div>
                </div>
              </div>

            ))}


          </Slider>) : (  <Slider {...settings}>
            {Object.values(nftObjects).map((object) => (
              <div className="col-lg-12 col-md-12 col-sm-10 col-xs-12" key={object.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img src={object.nftImage} className="lazy img-fluid h-full" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img className="lazy pp-coll" src={object.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{object.title}</h4>
                    </Link>
                    <span>ERC-{object.code}</span>
                  </div>
                </div>
              </div>
          
            ))}
            </Slider>)
          }
         

        </div>
      </div>
    </section>
  );
};

export default HotCollections;
