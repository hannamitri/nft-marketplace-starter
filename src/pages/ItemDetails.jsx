import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { id } = useParams();
  const [nftItem, setNftItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNftItem() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        setNftItem(data);
      } catch (error) {
        console.error("Error fetching NFT details:", error);
      }
      setLoading(false);
    }
    fetchNftItem();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="400px" borderRadius="10px" />
                ) : (
                  <img
                    src={nftItem.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt="NFT"
                  />
                )}
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <Skeleton width="80%" height="30px" />
                  ) : (
                    <h2>{nftItem.title + " #" + nftItem.tag}</h2>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? <Skeleton /> : nftItem.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? <Skeleton /> : nftItem.likes}
                    </div>
                  </div>

                  <p>{loading ? <Skeleton /> : nftItem.description}</p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${nftItem.ownerId}`}>
                              <img className="lazy" src={nftItem.ownerImage} alt="Owner" />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="120px" height="20px" />
                          ) : (
                            <Link to={`/author/${nftItem.ownerId}`}>{nftItem.ownerName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${nftItem.creatorId}`}>
                              <img className="lazy" src={nftItem.creatorImage} alt="Creator" />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="120px" height="20px" />
                          ) : (
                            <Link to={`/author/${nftItem.creatorId}`}>{nftItem.creatorName}</Link>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="ETH" />
                      {loading ? <Skeleton width="80px" height="20px" /> : <span>{nftItem.price}</span>}
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
