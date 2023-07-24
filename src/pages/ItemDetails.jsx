import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loading, setLoading] = useState([]);
  const [item, setItem] = useState();
  const { id } = useParams();
  const imageStyle = {
    width: "100%",
    height: "100%",
  };
  const itemInfo = {
    width: "300px",
    height: "40px",
  };
  const itemInfoCounts = {
    width: "80px",
    height: "30px",
  };
  const itemInfoCountsText = {
    width: "100%",
    height: "80px",
  };

  const skeletonPP = {
    width: "50px%",
    height: "50px",
    borderradius: "50%",
  };
  const authorListInfo = {
    width: "125px",
    height: "20px",
  };
  const price = {
    width: "75px",
    height: "20px",
  };
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      );
      setItem(data);
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading ? (
          <>
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <div className="skeleton-box" style={imageStyle}></div>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <div className="skeleton-box" style={itemInfo}></div>
                      <div className="item_info_counts">
                        <div
                          className="skeleton-box"
                          style={itemInfoCounts}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={itemInfoCounts}
                        ></div>
                      </div>
                      <div
                        className="skeleton-box"
                        style={itemInfoCountsText}
                      ></div>
                      <p></p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div
                                className="skeleton-box"
                                style={skeletonPP}
                              ></div>
                            </div>
                            <div className="author_list_info">
                              <div
                                className="skeleton-box"
                                style={authorListInfo}
                              ></div>
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
                              <div
                                className="skeleton-box"
                                style={skeletonPP}
                              ></div>
                            </div>
                            <div className="author_list_info">
                              <div
                                className="skeleton-box"
                                style={authorListInfo}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <div className="skeleton-box" style={price}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {item.title} #{item.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {item.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {item.likes}
                      </div>
                    </div>
                    <p>{item.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.ownerId}`}>
                              <img
                                className="lazy"
                                src={item.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
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
                            <Link to={`/author/${item.creatorId}`}>
                              <img
                                className="lazy"
                                src={item.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
