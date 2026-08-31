import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton"; // Adjust path if needed

const ItemDetails = () => {
  const { id } = useParams(); // Gets NFT ID from URL path
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItemDetails() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchItemDetails();
    window.scrollTo(0, 0); // Scroll to top when arriving on page
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              // Skeleton Loading State
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="100%" minHeight="400px" borderRadius="8px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="300px" height="40px" className="mb-3" />
                    <div className="item_info_counts mb-3 d-flex gap-3">
                      <Skeleton width="80px" height="30px" />
                      <Skeleton width="80px" height="30px" />
                    </div>
                    <Skeleton width="100%" height="80px" className="mb-4" />
                    
                    <div className="d-flex flex-row mb-4">
                      <div className="mr-4">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          </div>
                          <div className="author_list_info">
                            <Skeleton width="100px" height="20px" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          </div>
                          <div className="author_list_info">
                            <Skeleton width="100px" height="20px" />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <Skeleton width="120px" height="35px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Loaded Item Content
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={item?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item?.title}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {item?.title} #{item?.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {item?.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {item?.likes}
                      </div>
                    </div>

                    <p>{item?.description}</p>

                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item?.ownerId}`}>
                              <img
                                className="lazy"
                                src={item?.ownerImg}
                                alt={item?.ownerName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item?.ownerId}`}>
                              {item?.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item?.creatorId}`}>
                              <img
                                className="lazy"
                                src={item?.creatorImg}
                                alt={item?.creatorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item?.creatorId}`}>
                              {item?.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="spacer-40"></div>

                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src="/images/ethereum.svg" alt="ETH" />
                        <span>{item?.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;