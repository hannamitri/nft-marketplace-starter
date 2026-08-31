import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [nftId]);

  useEffect(() => {
    if (!nftId) {
      setLoading(false);
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      )
      .then((response) => {
        console.log("Item Details API:", response.data);

        setItem(response.data);
      })
      .catch((error) => {
        console.error("Item Details API error:", error);

        setItem(null);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [nftId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">

                <div className="col-md-6">
                  <div className="item-details-skeleton-image"></div>
                </div>

                <div className="col-md-6">
                  <div className="item_info">

                    <div className="item-details-skeleton-title"></div>

                    <div className="item-details-skeleton-small"></div>

                    <div className="item-details-skeleton-text"></div>
                    <div className="item-details-skeleton-text"></div>
                    <div className="item-details-skeleton-text short"></div>

                    <div className="item-details-skeleton-profile">
                      <div className="item-details-skeleton-avatar"></div>

                      <div className="item-details-skeleton-name"></div>
                    </div>

                    <div className="item-details-skeleton-profile">
                      <div className="item-details-skeleton-avatar"></div>

                      <div className="item-details-skeleton-name"></div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section
            aria-label="section"
            className="mt90 sm-mt-0"
          >
            <div className="container">
              <div className="text-center">
                Item not found.
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

        <section
          aria-label="section"
          className="mt90 sm-mt-0"
        >
          <div className="container">
            <div className="row">

              {/* NFT IMAGE */}
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                className="img-fluid img-rounded mb-sm-30 item-details-nft-image"
                  alt={item.title}
                />
              </div>

              {/* NFT INFORMATION */}
              <div className="col-md-6">
                <div className="item_info">

                  <h2>{item.title}</h2>

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

                  <p>
                    {item.description}
                  </p>

                  <div className="d-flex flex-row">

                    {/* OWNER */}
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

                      {/* CREATOR */}
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

                    {/* PRICE */}
                    <h6>Price</h6>

                    <div className="nft-item-price">
                      <img
                        src={EthImage}
                        alt="Ethereum"
                      />

                      <span>
                        {item.price}
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