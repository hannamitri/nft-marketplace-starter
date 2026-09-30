import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [searchParams] = useSearchParams();
  const nftId = searchParams.get("nftId");

  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      )
      .then((response) => {
        setNft(response.data);
        setLoading(false);
      });
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton
                    width="100%"
                    height="500px"
                    borderRadius="10px"
                  />
                ) : (
                  <img
                    src={nft?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <Skeleton
                      width="250px"
                      height="40px"
                      borderRadius="5px"
                    />
                  ) : (
                    <h2>
                      {nft?.title} #{nft?.tag}
                    </h2>
                  )}
                  <div className="item_info_counts">
                    {loading ? (
                      <>
                        <Skeleton
                          width="80px"
                          height="30px"
                          borderRadius="5px"
                        />
                        <Skeleton
                          width="80px"
                          height="30px"
                          borderRadius="5px"
                        />
                      </>
                    ) : (
                      <>
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nft?.views}
                        </div>

                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nft?.likes}
                        </div>
                      </>
                    )}
                  </div>
                  {loading ? (
                    <div style={{ marginTop: "20px" }}>
                      <Skeleton
                        width="100%"
                        height="20px"
                        borderRadius="5px"
                      />
                    </div>
                  ) : (
                    <p>{nft?.description}</p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>

                      {loading ? (
                        <Skeleton
                          width="150px"
                          height="45px"
                          borderRadius="5px"
                        />
                      ) : (
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft?.ownerId}`}>
                              <img
                                className="lazy"
                                src={nft?.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>

                          <div className="author_list_info">
                            <Link to={`/author/${nft?.ownerId}`}>
                              {nft?.ownerName}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>

                      {loading ? (
                        <Skeleton
                          width="150px"
                          height="45px"
                          borderRadius="5px"
                        />
                      ) : (
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft?.creatorId}`}>
                              <img
                                className="lazy"
                                src={nft?.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>

                          <div className="author_list_info">
                            <Link to={`/author/${nft?.creatorId}`}>
                              {nft?.creatorName}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>

                    {loading ? (
                      <Skeleton
                        width="100px"
                        height="35px"
                        borderRadius="5px"
                      />
                    ) : (
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{nft?.price}</span>
                      </div>
                    )}
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