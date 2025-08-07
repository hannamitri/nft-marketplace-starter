import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import CountdownTimer from "../components/UI/CountdownTimer";

const ItemDetails = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        setItemData(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setError("Failed to load item details");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
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
                  <Skeleton width="100%" height="400px" borderRadius="8px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="80%" height="40px" borderRadius="4px" />
                    <br /><br />
                    <Skeleton width="60%" height="20px" borderRadius="4px" />
                    <br /><br />
                    <Skeleton width="100%" height="100px" borderRadius="4px" />
                    <br /><br />
                    <Skeleton width="50%" height="60px" borderRadius="4px" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h2>Error Loading Item</h2>
                  <p>{error}</p>
                  <Link to="/" className="btn-main">Go Back Home</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h2>Item Not Found</h2>
                  <p>The NFT you're looking for doesn't exist.</p>
                  <Link to="/" className="btn-main">Go Back Home</Link>
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
                  src={itemData.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={itemData.title || "NFT"}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemData.title || "Unnamed NFT"}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemData.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemData.likes || 0}
                    </div>
                  </div>
                  <p>
                    {itemData.description || "No description available for this NFT."}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemData.ownerId}`}>
                            <img 
                              className="lazy" 
                              src={itemData.ownerImage || AuthorImage} 
                              alt="" 
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData.ownerId}`}>
                            {itemData.ownerName || "Unknown Owner"}
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
                          <Link to={`/author/${itemData.authorId}`}>
                            <img 
                              className="lazy" 
                              src={itemData.authorImage || AuthorImage} 
                              alt="" 
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData.authorId}`}>
                            {itemData.authorName || "Unknown Creator"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    {itemData.expiryDate && (
                      <>
                        <h6>Auction Ends In</h6>
                        <div className="nft-item-countdown">
                          <CountdownTimer expiryDate={itemData.expiryDate} />
                        </div>
                        <div className="spacer-20"></div>
                      </>
                    )}
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemData.price || "0.00"}</span>
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
