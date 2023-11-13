import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "../UI/Skeleton";

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

  const slider = React.useRef(null);

  const settings = {
    infinite: true,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
          <div className="relative p-1">
            {loading ? (
              <>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="hover:scale-110 transition-transform rounded-full w-4 h-4 p-2 left-0 border-black border-1 absolute top-[50%] bg-white"
                  onClick={() => slider?.current?.slickPrev()}
                />
                <Slider {...settings} ref={slider}>
                  {data.map((nft) => (
                    <div
                      className="px-2 sm:px-1"
                      key={nft.id}
                      data-aos="fade-left"
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${nft.nftId}`}>
                            <img
                              src={nft.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${nft.authorId}`}>
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
                            <h4>{nft.title}</h4>
                          </Link>
                          <span>ERC-{nft.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="hover:scale-110 transition-transform p-2 rounded-full w-4 h-4 border-black border-1 absolute right-0 top-[50%] bg-white"
                  onClick={() => slider?.current?.slickNext()}
                />
              </>
            ) : (
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
    </section>
  );
};

export default HotCollections;
