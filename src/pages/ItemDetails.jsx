import EthImage from "../images/ethereum.svg";
import { Link, useLocation } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const location = useLocation();
  const item = location.state?.item;

  const [authorInfo, setAuthorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchAuthor() {
      try {
        setLoading(true);

        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        const author = response.data.find(
          (seller) => seller.authorId === item?.authorId
        );

        setAuthorInfo(author || null);
      } catch (error) {
        console.log("Error fetching author:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }

    if (item?.authorId) {
      fetchAuthor();
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [item?.authorId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">

              {/* NFT IMAGE */}
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton
                    width="100%"
                    height="400px"
                    borderRadius="12px"
                  />
                ) : (
                  <img
                    src={item.nftImage || nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item.title || "NFT artwork"}
                  />
                )}
              </div>

              {/* NFT INFORMATION */}
              <div className="col-md-6">
                <div className="item_info">

                  {/* TITLE */}
                  {loading ? (
                    <Skeleton
                      width="75%"
                      height="32px"
                      borderRadius="5px"
                    />
                  ) : (
                    <h2>{item.title || "Untitled NFT"}</h2>
                  )}

                  {/* VIEWS AND LIKES */}
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? (
                        <Skeleton
                          width="30px"
                          height="15px"
                          borderRadius="4px"
                        />
                      ) : (
                        "100"
                      )}
                    </div>

                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? (
                        <Skeleton
                          width="30px"
                          height="15px"
                          borderRadius="4px"
                        />
                      ) : (
                      item.likes !== undefined && item.likes !== null
                        ? item.likes
                        : 0
                    )}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  {loading ? (
                    <div className="d-flex flex-column" style={{ gap: "10px" }}>
                      <Skeleton width="100%" height="14px" />
                      <Skeleton width="95%" height="14px" />
                      <Skeleton width="90%" height="14px" />
                      <Skeleton width="85%" height="14px" />
                    </div>
                  ) : (
                    <p>
                      {item.description || "Explore this unique NFT artwork."}
                    </p>
                  )}

                  {/* OWNER */}
                  <div className="d-flex flex-row">
                    <div className="mr40">

                      {loading ? (
                        <Skeleton
                          width="65px"
                          height="18px"
                          borderRadius="4px"
                        />
                      ) : (
                        <h6>Owner</h6>
                      )}

                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          ) : (
                            <Link to="/author" 
                              state={{ author: authorInfo }}>
                              <img
                                className="lazy"
                                src={authorInfo?.authorImage || item.authorImage || AuthorImage}
                                alt="NFT Owner"
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>

                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton
                              width="110px"
                              height="16px"
                              borderRadius="4px"
                            />
                          ) : (
                            <Link to="/author"
                              state={{ author: authorInfo }}
                            >
                              {authorInfo?.authorName || "Unknown author"}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CREATOR */}
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">

                      {loading ? (
                        <Skeleton
                          width="65px"
                          height="18px"
                          borderRadius="4px"
                        />
                      ) : (
                        <h6>Creator</h6>
                      )}

                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          ) : (
                            <Link to="/author" 
                              state={{ author: authorInfo }}>
                              <img
                                className="lazy"
                                src={authorInfo?.authorImage || item.authorImage || AuthorImage}
                                alt="NFT creator"
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>

                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton
                              width="110px"
                              height="16px"
                              borderRadius="4px"
                            />
                          ) : (
                            <Link to="/author"
                              state={{ author: authorInfo }}
                            >
                              {authorInfo?.authorName || "Unknown author"}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    {/* PRICE */}
                    {loading ? (
                      <Skeleton
                        width="65px"
                        height="18px"
                        borderRadius="4px"
                      />
                    ) : (
                      <h6>Price</h6>
                    )}

                    <div className="nft-item-price">
                      {loading ? (
                        <>
                          <Skeleton
                            width="25px"
                            height="25px"
                            borderRadius="50%"
                          />
                          <Skeleton
                            width="100px"
                            height="20px"
                            borderRadius="4px"
                          />
                        </>
                      ) : (
                        <>
                          <img src={EthImage} alt="Ethereum" />
                          <span>
                            {item.price != null
                              ? `${item.price} ETH`
                              : "Price unavailable"}
                          </span>
                        </>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;