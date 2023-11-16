import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setData(response.data);
      setLoading(true);
    }
    getData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplayspeed: 2000,
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

          {/* Added sliders */}
          <div className="relative p-1">
            {loading ?
              <>
                <Slider {...settings} >
                  {data.map((data) => (
                    <div className="px-2 sm:px-1" key={data.id} data-aos="fade-left">
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${data.nftId}`}>
                            <img src={data.nftImage} className="lazy img-fluid" alt="" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${data.authorId}`}>
                            <img className="lazy pp-coll" src={data.authorImage} alt="" />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{data.title}</h4>
                          </Link>
                          <span>ERC-{data.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </>
              : (
                <Slider {...settings}>
                  {new Array(4).fill(0).map((_, index) => (
                    <div className="px-2 sm:px-1" key={index}>
                      <div className="nft_coll">
                        <Skeleton width="100%" height={200} borderRadius={10} />

                        <div className="nft_coll_pp">
                          <Skeleton width={60} height={60} borderRadius={9999} />
                        </div>

                        <div className="nft_coll_info flex flex-col items-center">
                          <Skeleton width={100} height={16} borderRadius={10} />
                          <div className="h-2"></div>
                          <Skeleton width={60} height={16} borderRadius={10} />
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
          </div>
        </div>
      </div>
    </section >
  );
};

export default HotCollections;