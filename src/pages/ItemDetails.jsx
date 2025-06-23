import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id: nftId } = useParams();

  const { data: nft = {}, isLoading } = useSWR(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=" +
      nftId
  );
  console.log(nft);

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
                {isLoading ? (
                  <Skeleton width="100%" height="400px" />
                ) : (
                  <img
                    src={nft.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {isLoading ? (
                    <>
                      <Skeleton width="100%" height="46px" />
                      <Skeleton width="45%" height="30px" />
                    </>
                  ) : (
                    <>
                      <h2>
                        {nft.title} #{nft.tag}
                      </h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nft.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nft.likes}
                        </div>
                      </div>
                    </>
                  )}
                  {isLoading ? (
                    <>
                      <Skeleton width="100%" height="75px" margin="30px 0 60px" />
                      <Skeleton width="60%" height="30px" />
                      <Skeleton width="60%" height="30px" /><br />
                      <Skeleton width="100px" height="20px" />
                    </>
                  ) : (
                    <>
                      <p>{nft.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={"/author/" + nft.ownerId}>
                                <img
                                  className="lazy"
                                  src={nft.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={"/author/" + nft.ownerId}>
                                {nft.ownerName}
                              </Link>
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
                              <Link to={"/author/" + nft.creatorId}>
                                <img
                                  className="lazy"
                                  src={nft.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={"/author/" + nft.creatorId}>
                                {nft.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nft.price}</span>
                        </div>
                      </div>
                    </>
                  )}
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
