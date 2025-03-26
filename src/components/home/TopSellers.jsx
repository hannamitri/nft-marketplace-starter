import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
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
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setLocalNftData(response.data);
      } catch (error) {
        console.error("There was an error fetching the NFT data!", error);
      }
    };
    fetchNFTs();
  }, []);

  const SkeletonAvatar = ({
    width = "auto",
    height = "auto",
    className = "skeleton-avatar",
    isSquare = false,
  }) => {
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
    imageHeight = "auto",
    titleHeight = "100%",
    imageWidth = "100%",
    ercHeight = "15px",
    ercWidth = "60px",
    ppHeight = "15px",
    imageClass = "skeleton-image",
    titleClass = "skeleton-title",
    ercClass = "skeleton-erc",
    ppClass = "skeleton-icon",
  }) => {
    return (
      <div className="col-md-12">
        <ol className="author_list">
          <li>
            <div className="author_list_pp">
              <SkeletonAvatar height="100%" width="45" />
              <div
                className={`${imageClass}`}
                style={{ height: imageHeight, width: imageWidth }}
              ></div>{" "}
              <img className="lazy pp-author" src="" alt="" />
              <i className="fa fa-check"></i>
            </div>
            <div className="author_list_info">
              <Link to="/author">
                <SkeletonAvatar height="100%" width="100%" isSquare={true} />
                <div
                  className={`${titleClass}`}
                  // style={{ height: titleHeight, width: titleWidth }}
                ></div>{" "}
              </Link>

              <span>
                <SkeletonAvatar height="10px" width="30px" isSquare={true} />
                <div
                  className={`${ercClass}`}
                  style={{ height: ercHeight, width: ercWidth }}
                ></div>{" "}
              </span>
            </div>
          </li>
        </ol>
      </div>
    );
  };

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonNftCard
                key={index}
                imageHeight="auto"
                titleHeight="auto"
                ercHeight="auto"
                ppHeight="auto"
                imageClass="custom-skeleton-image"
                titleClass="custom-skeleton-title"
                ercClass="custom-skeleton-erc"
                ppClass="custom-skeleton-icon"
              />
            ))
          ) : (
            <div className="col-md-12">
              <ol className="author_list">
                {localNftData.length > 0 &&
                  localNftData.map((nft, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={nft.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{nft.authorName}</Link>
                        <span>{`${nft.price}`} ETH</span>
                      </div>
                    </li>
                  ))}
              </ol>
            </div>
          )}
          ;
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
