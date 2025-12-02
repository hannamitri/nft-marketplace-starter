import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import useFetch from "../components/UI/apiFetch";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: nftData, loading } = useFetch(
    id ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}` : null
  );
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width="100%" height="400px" borderRadius="8px" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton width="60%" height="40px" borderRadius="4px" />
                      <div className="item_info_counts" style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Skeleton width="100px" height="20px" borderRadius="4px" />
                      </div>
                      <Skeleton width="100%" height="80px" borderRadius="4px" />
                      <div style={{ marginTop: "30px" }}>
                        <Skeleton width="150px" height="20px" borderRadius="4px" />
                        <div style={{ marginTop: "10px" }}>
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        </div>
                      </div>
                      <div style={{ marginTop: "30px" }}>
                        <Skeleton width="150px" height="20px" borderRadius="4px" />
                        <div style={{ marginTop: "10px" }}>
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        </div>
                      </div>
                      <div style={{ marginTop: "30px" }}>
                        <Skeleton width="100px" height="30px" borderRadius="4px" />
                      </div>
                    </div>
                  </div>
                </>
              ) : nftData ? (
                <>
              <div className="col-md-6 text-center">
                <img
                  src={nftData?.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nftData?.title} #{nftData?.nftId}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nftData?.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nftData?.likes}
                    </div>
                  </div>
                  <p>
                    {nftData?.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftData?.ownerId}`}>
                            <img className="lazy" src={nftData?.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftData?.ownerId}`}>{nftData?.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftData?.creatorId}`}>
                            <img className="lazy" src={nftData?.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftData?.creatorId}`}>{nftData?.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nftData?.price}</span>
                    </div>
                  </div>
                </div>
              </div>
                </>
              ) : (
                <div className="col-md-12">
                  <p>NFT not found</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
