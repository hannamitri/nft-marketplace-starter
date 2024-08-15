import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchItemDetails();
  }, [id]);

  async function fetchItemDetails() {
    try {
      const response = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      );
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

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
                    <Skeleton width={"100%"} height={482} />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2><Skeleton width={300} height={40} /></h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <Skeleton />
                        </div>
                        <div className="item_info_like">
                          <Skeleton />
                        </div>
                      </div>
                      <p><Skeleton width={"100%"} height={80} /></p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton width={50} height={50} borderRadius={100} />
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={100} height={20} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton width={50} height={50} borderRadius={100} />
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={100} height={20} />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <Skeleton width={100} height={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                item && (
                  <>
                    <div className="col-md-6 text-center">
                      <img
                        src={item.nftImage}
                        className="img-fluid img-rounded mb-sm-30 nft-image"
                        alt={item.title}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="item_info">
                        <h2>{item.title} #{item.tag}</h2>

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
                                    alt={item.ownerName}
                                  />
                                  <i className="fa fa-check"></i>
                                </Link>
                              </div>
                              <div className="author_list_info">
                                <Link to={`/author/${item.ownerId}`}>
                                  {item.ownerName}
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
                                <Link to={`/author/${item.creatorId}`}>
                                  <img
                                    className="lazy"
                                    src={item.creatorImage}
                                    alt={item.creatorName}
                                  />
                                  <i className="fa fa-check"></i>
                                </Link>
                              </div>
                              <div className="author_list_info">
                                <Link to={`/author/${item.creatorId}`}>
                                  {item.creatorName}
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="spacer-40"></div>
                          <h6>Price</h6>
                          <div className="nft-item-price">
                            <img src={EthImage} alt="Ethereum" />
                            <span>{item.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;