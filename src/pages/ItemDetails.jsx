import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div
                    className="skeleton-box"
                    style={{ width: "100%", height: "400px", borderRadius: "8px" }}
                  ></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div
                      className="skeleton-box"
                      style={{ width: "300px", height: "40px", marginBottom: "15px" }}
                    ></div>
                    <div
                      className="skeleton-box"
                      style={{ width: "150px", height: "20px", marginBottom: "20px" }}
                    ></div>
                    <div
                      className="skeleton-box"
                      style={{ width: "100%", height: "80px", marginBottom: "20px" }}
                    ></div>
                    <div
                      className="skeleton-box"
                      style={{ width: "200px", height: "50px" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
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
                              src={item?.ownerImage}
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
                              src={item?.creatorImage}
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
                      <img src={EthImage} alt="ETH" />
                      <span>{item?.price}</span>
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