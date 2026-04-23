import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (nftId) fetchItem();
  }, [nftId]);

  if (loading)
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section className="mt90 sm-mt-0" aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="520px" borderRadius="12px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="70%" height="42px" borderRadius="6px" />
                    <div className="mt-3 d-flex" style={{ gap: "12px" }}>
                      <Skeleton width="90px" height="28px" borderRadius="6px" />
                      <Skeleton width="90px" height="28px" borderRadius="6px" />
                    </div>
                    <div className="mt-3">
                      <Skeleton width="100%" height="16px" borderRadius="4px" />
                    </div>
                    <div className="mt-2">
                      <Skeleton width="92%" height="16px" borderRadius="4px" />
                    </div>
                    <div className="mt-2">
                      <Skeleton width="85%" height="16px" borderRadius="4px" />
                    </div>
                    <div className="mt-4">
                      <Skeleton width="120px" height="18px" borderRadius="4px" />
                    </div>
                    <div className="mt-2 d-flex align-items-center" style={{ gap: "12px" }}>
                      <Skeleton width="56px" height="56px" borderRadius="50%" />
                      <Skeleton width="160px" height="18px" borderRadius="4px" />
                    </div>
                    <div className="spacer-40"></div>
                    <Skeleton width="90px" height="18px" borderRadius="4px" />
                    <div className="mt-2">
                      <Skeleton width="130px" height="28px" borderRadius="6px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );

  if (error || !item)
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section className="mt90 sm-mt-0">
            <div className="container text-center p-5 text-danger">
              {error || "Item not found."}
            </div>
          </section>
        </div>
      </div>
    );

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center" data-aos="fade-right" data-aos-delay="80">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6" data-aos="fade-left" data-aos-delay="160">
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
                            <img className="lazy" src={item.ownerImage} alt={item.ownerName} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
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
                            <img className="lazy" src={item.creatorImage} alt={item.creatorName} />
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
                      <img src={EthImage} alt="ETH" />
                      <span>{item.price}</span>
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
