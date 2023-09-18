import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nft, setNft] = useState();
  const [loadingnft, setLoadingNft] = useState(null);

  const fetchNft = async () => {
    setLoadingNft(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    setNft(data);
    setLoadingNft(false)
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNft();
  }, []);

  return (
    <div id="wrapper">
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>
      <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container">
          {loadingnft ? (
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton width={"100%"} height={"100%"} />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    <Skeleton width={300} height={40} />
                  </h2>

                  <div className="item_info_counts">
                    <Skeleton width={80} height={30} />
                    <br />
                    <Skeleton width={80} height={30} />
                  </div>
                  <Skeleton width={"100%"} height={80} />
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton
                            width={50}
                            height={50}
                            borderRadius={50}
                          />
                        </div>
                        <div className="author_list_info">
                          <Skeleton width={125} height={20} />
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
                          <Skeleton
                            width={50}
                            height={50}
                            borderRadius={50}
                          />
                        </div>
                        <div className="author_list_info">
                          <Skeleton width={125} height={20} />
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <Skeleton width={75} height={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nft?.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {nft?.title} #{nft?.tag}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nft?.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nft?.likes}
                    </div>
                  </div>
                  <p>{nft?.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
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
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
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
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nft?.price}</span>
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
