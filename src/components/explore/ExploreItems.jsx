import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const ExploreItems = () => {
  const API_URL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

  const [explore, setExplore] = useState([]);
  const [loadedImages, setLoadedImages] = useState({ main: {}, author: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setExplore(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error Fetching Data", error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {(loading ? new Array(8).fill({}) : explore).map((item, index) => {
        const hasMain = Boolean(item && item.nftImage);
        const hasAuthor = Boolean(item && item.authorImage);
        const isMainImageLoaded = Boolean(loadedImages.main[index]);
        const isAuthorImageLoaded = Boolean(loadedImages.author[index]);

        return (
          <div
            key={item.id || index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to="/author"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`Creator: ${item.author || "Monica Lucas"}`}
                >
                  <div className="position-relative" style={{ width: 50, height: 50 }}>
                    {!hasAuthor || !isAuthorImageLoaded ? (
                      <div
                        className="skeleton-box"
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          borderRadius: "50%",
                          position: "absolute",
                          top: 0,
                          left: 0
                        }}
                      ></div>
                    ) : null}
                    {hasAuthor ? (
                      <img
                        className="lazy"
                        src={item.authorImage || AuthorImage}
                        alt=""
                        onLoad={() =>
                          setLoadedImages((prev) => ({
                            ...prev,
                            author: { ...prev.author, [index]: true },
                          }))
                        }
                        style={{ 
                          display: isAuthorImageLoaded ? "block" : "none",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    ) : null}
                  </div>
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              
              {item.expiryDate && (
                <div className="de_countdown">
                  {loading ? "" : "5h 30m 32s"}
                </div>
              )}

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                
                <Link to="/item-details">
                  <div className="position-relative" style={{ width: "100%" }}>
                    {!hasMain || !isMainImageLoaded ? (
                      <div 
                        className="skeleton-box" 
                        style={{ 
                          width: "100%", 
                          paddingTop: "100%" 
                        }}
                      ></div>
                    ) : null}
                    {hasMain ? (
                      <img
                        src={item.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                        onLoad={() =>
                          setLoadedImages((prev) => ({
                            ...prev,
                            main: { ...prev.main, [index]: true },
                          }))
                        }
                        style={{ 
                          display: isMainImageLoaded ? "block" : "none" 
                        }}
                      />
                    ) : null}
                  </div>
                </Link>
              </div>
              
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{item.title || (loading ? "" : "Pinky Ocean")}</h4>
                </Link>
                <div className="nft__item_price">
                  {item.price ? `${item.price} ETH` : (loading ? "" : "1.74 ETH")}
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes || (loading ? "" : "69")}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
