import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import itemsData from "../api/itemsDetailsApi.json";
import exploreItemData from "../api/exploreApi.json";
import newItemData from "../api/newItemApi.json";
import "./ItemDetails.css";

const ItemDetails = () => {
  const [loading, setLoading] = useState(true);
  const [itemDetails, setItemDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const itemId = id ? parseInt(id) : 1;
    
    let foundItem = itemsData.find(item => item.id === itemId);
    
    if (!foundItem) {
      const exploreItem = exploreItemData.find(item => item.id === itemId);
      if (exploreItem) {
        foundItem = itemsData.find(item => 
          item.title && exploreItem.title && 
          item.title.toLowerCase() === exploreItem.title.toLowerCase()
        );
      }
      
      if (!foundItem) {
        const newItem = newItemData.find(item => item.id === itemId);
        if (newItem) {
          foundItem = itemsData.find(item => 
            item.title && newItem.title && 
            item.title.toLowerCase() === newItem.title.toLowerCase()
          );
        }
      }
    }
    
    if (foundItem) {
      console.log("Found item details:", foundItem);
      setItemDetails(foundItem);
    } else {
      console.log("Item not found with ID:", itemId);
      setItemDetails(itemsData[0]);
    }
    
    setLoading(false);
  }, [id]);

  const SkeletonUI = () => (
    <div className="skeleton-container">
      <div className="col-md-6 text-center">
        <div className="skeleton-image"></div>
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <div className="skeleton-title"></div>
          <div className="item_info_counts">
            <div className="skeleton-count"></div>
            <div className="skeleton-count"></div>
          </div>
          <div className="skeleton-description"></div>
          <div className="d-flex flex-row">
            <div className="mr40">
              <h6>Owner</h6>
              <div className="item_author">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-text"></div>
              </div>
            </div>
          </div>
          <div className="de_tab tab_simple">
            <div className="de_tab_content">
              <h6>Creator</h6>
              <div className="item_author">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-text"></div>
              </div>
            </div>
            <div className="spacer-40"></div>
            <h6>Price</h6>
            <div className="skeleton-price"></div>
          </div>
        </div>
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
              {loading ? (
                <SkeletonUI />
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={itemDetails?.nftImage || nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt={itemDetails?.title}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{itemDetails?.title || "Loading..."}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {itemDetails?.views || 0}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemDetails?.likes || 0}
                        </div>
                      </div>
                      <p>
                        {itemDetails?.description || "Loading description..."}
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetails?.ownerId || ""}`}>
                                <img className="lazy" src={itemDetails?.ownerImage || AuthorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails?.ownerId || ""}`}>{itemDetails?.ownerName || "Unknown"}</Link>
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
                              <Link to={`/author/${itemDetails?.creatorId || ""}`}>
                                <img className="lazy" src={itemDetails?.creatorImage || AuthorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails?.creatorId || ""}`}>{itemDetails?.creatorName || "Unknown"}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{itemDetails?.price || "0.00"}</span>
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
