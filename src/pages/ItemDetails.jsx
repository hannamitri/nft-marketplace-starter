import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        console.log(response.data);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching Item Details", error);
        setItem(null);
        setLoading(false);
      }
    };
    fetchItem();
  }, [nftId]);

  if (!item) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="skeleton-item-details-row">
                <div className="col-md-6 text-center">
                  <div className="skeleton-nft-card-img-2"></div>
                </div>
                <div className="com-md-6">
                  <div className="skeleton-item_info">
                    <div className="skeleton-nft-card-row skeleton-nft-card-row-md-nft-title"></div>

                    <div className="btns">
                      <div className="skeleton-nft-card-row skeleton-nft-card-row-md-4"></div>
                      <div className="skeleton-nft-card-row skeleton-nft-card-row-md-4"></div>
                    </div>

                    <div className="skeleton-nft-card-row skeleton-nft-card-row-sm-4"></div>
                    <div className="skeleton-nft-card-row skeleton-nft-card-row-md"></div>

                    <div className="avatar-name">
                      <div className="skeleton-seller-avatar-2"></div>
                      <div className="skeleton-nft-card-check-2">
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="skeleton-nft-card-row skeleton-nft-card-row-sm-5"></div>
                    </div>
                    <div className="skeleton-nft-card-row skeleton-nft-card-row-md"></div>
                    
                    <div className="avatar-name">
                      <div className="skeleton-seller-avatar-2"></div>
                      <div className="skeleton-nft-card-check-2">
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="skeleton-nft-card-row skeleton-nft-card-row-sm-5"></div>
                    </div>

                    <div className="skeleton-nft-card-row skeleton-nft-card-row-sm"></div>
                    <div className="skeleton-nft-card-row skeleton-nft-card-row-sm"></div>
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
                  src={item.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title + " #" + item.tag}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes || 0}
                    </div>
                  </div>
                  <p>{item.description || "No description available."}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img
                              className="lazy"
                              src={item.ownerImage || AuthorImage}
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
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author${item.creatorId}`}>
                            {item.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price || "No Price"}</span>
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
