import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HotCollections = ({ nftData }) => {
  const [localNftData, setLocalNftData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localNftData && localNftData.length > 0) {
      setIsLoading(false);
    }
  }, [localNftData]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setLocalNftData(response.data);
      } catch (error) {
        console.error("There was an error fetching the NFT data!", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNFTs();
  }, []);

  const Arrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: "#ccc",
          borderRadius: "50px",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const SkeletonAvatar = ({
   size = "100%",
    className = "skeleton-avatar",
    isSquare = false,
    margin = "0 auto",
  }) => {
    const width = isSquare ? size : `calc(${size} * 0.8)`;
    const height = isSquare ? size : `calc(${size} * 1.2)`;

    return (
      <div
        className={className}
        style={{
          width: width,
          height: height,
          borderRadius: isSquare ? "0%" : "50%",
          backgroundColor: "#e0e0e0",
          animation: "pulse 1.5s infinite",
          margin: "0 auto",
        }}
      />
    );
  };

  const SkeletonNftCard = ({
    avatarSize = "30px",
    imageHeight = "200px",
    titleHeight = "10px",
    imageWidth = "100%",
    ercHeight = "20px",
    ppHeight = "40px",
    imageClass = "skeleton-image",
    titleClass = "skeleton-title",
    ercClass = "skeleton-erc",
    ppClass = "skeleton-icon",
    margin = "0 auto",
  }) => {
    return (
      <div className="px-1">
        <div className="nft_coll">
          <div className="nft_wrap">
            <SkeletonAvatar width="100%" height="200px" isSquare={true} />
            <div
              className={`${imageClass}`}
              style={{
                height: imageHeight,
                width: imageWidth,
              }}
            ></div>{" "}
          </div>
          <div className="nft_coll_pp">
            <SkeletonAvatar size="45px" />
            <div
              className={`${ercClass}`}
              style={{ height: ercHeight }}
            ></div>{" "}
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>
                <SkeletonAvatar size={avatarSize} isSquare={true} />
                <div
                  className={`${titleClass}`}
                  style={{ height: titleHeight }}
                ></div>{" "}
              </h4>
            </Link>
            <span>
            <SkeletonAvatar size={avatarSize} isSquare={true} />
                <div
                  className={`${titleClass}`}
                  style={{ height: titleHeight }}
                ></div>{" "}
            </span>
          </div>
        </div>
      </div>
    );
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

          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonNftCard
                key={index}
                imageHeight="250px"
                titleHeight="25px"
                ercHeight="18px"
                ppHeight="45px"
                imageClass="custom-skeleton-image"
                titleClass="custom-skeleton-title"
                ercClass="custom-skeleton-erc"
                ppClass="custom-skeleton-icon"
              />
            ))
          ) : (
            <Slider {...settings}>
              {localNftData.length > 0 &&
                localNftData.map((nft, index) => (
                  <div key={index} className="px-1">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${nft.nftId}`}>
                          <img
                            src={`${nft.nftImage}`}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${nft.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={`${nft.authorImage}`}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{`${nft.title}`}</h4>
                        </Link>
                        <span>ERC-{`${nft.code}`}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
