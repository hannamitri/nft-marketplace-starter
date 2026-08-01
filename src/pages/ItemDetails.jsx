import axios from "axios";
import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const ITEM_DETAILS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

const ItemDetailsSkeleton = () => (
  <div id="wrapper">
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>
      <section aria-label="Loading NFT details" className="mt90 sm-mt-0">
        <div className="container" role="status" aria-live="polite">
          <span className="sr-only">Loading NFT details...</span>
          <div className="row">
            <div className="col-md-6">
              <div className="item-details-skeleton-artwork">
                <Skeleton width="100%" height="100%" borderRadius="0" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="item_info item-details-skeleton-content">
                <Skeleton width="65%" height="46px" borderRadius="2px" />

                <div className="item-details-skeleton-counts">
                  <Skeleton width="90px" height="34px" borderRadius="3px" />
                  <Skeleton width="90px" height="34px" borderRadius="3px" />
                </div>

                <Skeleton width="100%" height="90px" borderRadius="0" />

                <div className="item-details-skeleton-section">
                  <h6>Owner</h6>
                  <div className="item-details-skeleton-author">
                    <Skeleton width="56px" height="56px" borderRadius="50%" />
                    <Skeleton width="140px" height="23px" borderRadius="0" />
                  </div>
                </div>

                <div className="item-details-skeleton-section">
                  <h6>Creator</h6>
                  <div className="item-details-skeleton-author">
                    <Skeleton width="56px" height="56px" borderRadius="50%" />
                    <Skeleton width="140px" height="23px" borderRadius="0" />
                  </div>
                </div>

                <div className="item-details-skeleton-section">
                  <h6>Price</h6>
                  <Skeleton width="84px" height="22px" borderRadius="0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!nftId) {
      setError("No NFT was selected.");
      return;
    }

    const fetchItemDetails = async () => {
      try {
        setError("");
        setItem(null);
        const { data } = await axios.get(ITEM_DETAILS_URL, {
          params: { nftId },
        });

        if (!data || !data.nftId) {
          throw new Error("NFT not found");
        }

        setItem(data);
      } catch (requestError) {
        console.error("Unable to fetch NFT details:", requestError);
        setError("Unable to load this NFT. Please try again later.");
      }
    };

    fetchItemDetails();
  }, [nftId]);

  if (error) {
    return (
      <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container text-center" role="alert">
          <h2>{error}</h2>
          <Link className="btn-main" to="/">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  if (!item) {
    return <ItemDetailsSkeleton />;
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
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
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
                      <img src={EthImage} alt="" />
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
