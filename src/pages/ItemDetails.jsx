/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [itemDetail, setItemDetail] = useState([]);
  const { nftId } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
setLoading(true);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      )
      .then((res) => {
        setItemDetail(res.data);
        console.log(res.data);
        setLoading(false)
      });
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
          {loading ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton height="100%" width="100%" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      <Skeleton height="50%" width="50%" />
                    </h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <Skeleton />
                      </div>
                      <div className="item_info_like">
                        <Skeleton />
                      </div>
                    </div>
                    <p>
                      <Skeleton height={90} width="100%" />
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to="/author">
                              <Skeleton height={50} borderRadius="50%" />
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width={100} />
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
                            <Link to="/author">
                              <Skeleton height={50} borderRadius="50%" />
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <span>
                          <Skeleton width={100} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemDetail.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemDetail.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetail.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetail.likes}
                    </div>
                  </div>
                  <p>
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                    illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetail.ownerId}`}>
                            <img
                              className="lazy"
                              src={itemDetail.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetail.ownerId}`}>{itemDetail.ownerName}</Link>
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
                          <Link to={`/author/${itemDetail.creatorId}`}>
                            <img
                              className="lazy"
                              src={itemDetail.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetail.creatorId}`}>{itemDetail.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemDetail.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
