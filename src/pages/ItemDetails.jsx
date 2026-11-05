import EthImage from "../images/ethereum.svg";
import { Link, useLocation } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const ItemDetails = () => {
  const location = useLocation();
  const item = location.state?.item;

  const [authorInfo, setAuthorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch author information based on the item's authorId
  useEffect(() => {
  async function fetchAuthor() {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );

      const author = response.data.find(
        (seller) => seller.authorId === item?.authorId
      );

      setAuthorInfo(author);
    } catch (error) {
      console.log("Error fetching author:", error);
    }
  }

  if (item?.authorId) {
    fetchAuthor();
  }
}, [item?.authorId]);

  // Skeleton loading effect for 1 second
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [item]);

  if (!item) {
    return <p>Item information not found. Please return to New Items.</p>;
  }

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
                  <div className="item-skeleton-image"></div>
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
                    <div className="item-skeleton-title"></div>
                  ) : (
                    <h2>{item.title || "Untitled NFT"}</h2>
                  )}

                  {/* VIEWS AND LIKES */}
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? (
                        <div className="item-skeleton-small"></div>
                      ) : (
                        "100"
                      )}
                    </div>

                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? (
                      <div className="item-skeleton-small"></div>
                    ) : (
                      item.likes !== undefined && item.likes !== null
                        ? item.likes
                        : 0
                    )}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  {loading ? (
                    <div className="item-skeleton-description">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
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
                        <div className="item-skeleton-heading"></div>
                      ) : (
                        <h6>Owner</h6>
                      )}

                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <div className="item-skeleton-avatar"></div>
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
                            <div className="item-skeleton-name"></div>
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
                        <div className="item-skeleton-heading"></div>
                      ) : (
                        <h6>Creator</h6>
                      )}

                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <div className="item-skeleton-avatar"></div>
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
                            <div className="item-skeleton-name"></div>
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
                      <div className="item-skeleton-heading"></div>
                    ) : (
                      <h6>Price</h6>
                    )}

                    <div className="nft-item-price">
                      {loading ? (
                        <>
                          <div className="item-skeleton-eth"></div>
                          <div className="item-skeleton-price"></div>
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