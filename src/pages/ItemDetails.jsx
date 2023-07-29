import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// testing <= GITHUB TEST
const ItemDetails = () => {
  const { nftId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchItemDetails() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      setItems(data);
      setLoading(false);
    }
    fetchItemDetails();
  }, []);

  const {
    id,
    tag,
    title,
    description,
    nftImage,
    creatorId,
    creatorImage,
    creatorName,
    likes,
    ownerId,
    ownerImage,
    ownerName,
    price,
    views,
  } = items;

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
                    <div
                      style={{ width: "100%", height: "100%" }}
                      className="img-fluid img-rounded mb-sm-30 nft-image skeleton-box"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6" key={id}>
                    <div className="item_info">
                      <div
                        className="skeleton-box"
                        style={{ width: "300px", height: "40px" }}
                      ></div>
                      <div className="item_info_counts">
                        <div
                          className="item_info_views skeleton-box"
                          style={{ width: "80px", height: "30px" }}
                        ></div>
                        <div
                          className="item_info_like skeleton-box"
                          style={{ width: "80px", height: "30px" }}
                        ></div>
                      </div>
                      <p
                        className="skeleton-box"
                        style={{ width: "100%", height: "80px" }}
                      ></p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${ownerId}`}>
                                <div
                                  className="lazy skeleton-box"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "9999px",
                                  }}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link
                                to={`/author/${ownerId}`}
                                style={{ width: "125px", height: "20px" }}
                                className="skeleton-box"
                              ></Link>
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
                              <Link to={`/author/${creatorId}`}>
                                <div
                                  className="lazy skeleton-box"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "9999px",
                                  }}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link
                                to={`/author/${ownerId}`}
                                style={{ width: "125px", height: "20px" }}
                                className="skeleton-box"
                              ></Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div
                          className="nft-item-price skeleton-box"
                          style={{ width: "75px", height: "20px" }}
                        >
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6" key={id}>
                    <div className="item_info">
                      <h2>
                        {title} #{tag}
                      </h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {likes}
                        </div>
                      </div>
                      <p>{description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${ownerId}`}>
                                <img className="lazy" src={ownerImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${ownerId}`}>{ownerName}</Link>
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
                              <Link to={`/author/${creatorId}`}>
                                <img
                                  className="lazy"
                                  src={creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${creatorId}`}>
                                {creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
