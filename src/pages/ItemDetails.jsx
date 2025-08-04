import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ItemDetails = () => {
  const { id, source } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl =
    source === "hot"
      ? "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      : "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(apiUrl)
      .then((res) => {
        const selectedItem = res.data[parseInt(id)];
        setItem(selectedItem);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching item:", err));
  }, [id, source]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton height={400} />
                ) : (
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{loading ? <Skeleton /> : item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? <Skeleton width={30} /> : 100}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? <Skeleton width={30} /> : 74}
                    </div>
                  </div>

                  <p>
                    {loading ? (
                      <Skeleton count={3} />
                    ) : (
                      item.description || "No description available."
                    )}
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton circle height={50} width={50} />
                          ) : (
                            <Link to="/author">
                              <img
                                className="lazy"
                                src={item.authorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">
                            {loading ? <Skeleton width={80} /> : item.title}
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
                          {loading ? (
                            <Skeleton circle height={50} width={50} />
                          ) : (
                            <Link to="/author">
                              <img
                                className="lazy"
                                src={item.authorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">
                            {loading ? <Skeleton width={80} /> : item.title}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>
                        {loading ? (
                          <Skeleton width={50} />
                        ) : (
                          item.price || "1.85"
                        )}
                      </span>
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
