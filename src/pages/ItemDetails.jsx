import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useSearchParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [searchParams] = useSearchParams();
  const nftId = searchParams.get("nftId") || "17914494";

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchItem() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center" data-aos="fade-right">
                {loading ? (
                  <Skeleton
                    width="100%"
                    height="400px"
                    borderRadius="10px"
                  />
                ) : (
                  <img
                    src={item?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item?.title}
                  />
                )}
              </div>

              <div className="col-md-6" data-aos="fade-left">
                <div className="item_info">
                  {loading ? (
                    <Skeleton width="200px" height="32px" borderRadius="4px" />
                  ) : (
                    <h2>{item?.title} #{item?.tag}</h2>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? (
                        <Skeleton width="30px" height="16px" borderRadius="4px" />
                      ) : (
                        item?.views
                      )}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? (
                        <Skeleton width="30px" height="16px" borderRadius="4px" />
                      ) : (
                        item?.likes
                      )}
                    </div>
                  </div>

                  {loading ? (
                    <Skeleton width="100%" height="60px" borderRadius="4px" />
                  ) : (
                    <p>{item?.description}</p>
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author?author=${item?.ownerId}`}>
                              <img
                                className="lazy"
                                src={item?.ownerImage}
                                alt={item?.ownerName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="100px" height="16px" borderRadius="4px" />
                          ) : (
                            <Link to={`/author?author=${item?.ownerId}`}>
                              {item?.ownerName}
                            </Link>
                          )}
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
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author?author=${item?.creatorId}`}>
                              <img
                                className="lazy"
                                src={item?.creatorImage}
                                alt={item?.creatorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="100px" height="16px" borderRadius="4px" />
                          ) : (
                            <Link to={`/author?author=${item?.creatorId}`}>
                              {item?.creatorName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      {loading ? (
                        <Skeleton width="60px" height="20px" borderRadius="4px" />
                      ) : (
                        <span>{item?.price}</span>
                      )}
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
