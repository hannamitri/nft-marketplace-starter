
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const { nftId } = useParams();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError("");

    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((response) => {
        const matchingItem = response.data.find(
          (nft) => String(nft.nftId) === String(nftId)
        );

        if (!matchingItem) {
          setError("NFT not found in the New Items collection.");
        }

        setItem(matchingItem || null);
      })
      .catch((error) => {
        console.error("Error fetching NFT details:", error);
        setError("Unable to load NFT details.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [nftId]);

  if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading NFT...</h3>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container text-center mt-5">
        <h3>{error || "NFT not found."}</h3>
        <Link to="/explore" className="btn-main">
          Back to Explore
        </Link>
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
                  alt={item.title || "NFT"}
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views ?? 0}
                    </div>

                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes ?? 0}
                    </div>
                  </div>

                  <p>
                    {item.description || "Explore this unique NFT collectible."}
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy"
                              src={item.authorImage || AuthorImage}
                              alt={item.authorName || "Owner"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId}`}>
                            {item.authorName || `Creator #${item.authorId}`}
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
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy"
                              src={item.authorImage || AuthorImage}
                              alt={item.authorName || "Creator"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId}`}>
                            {item.authorName || `Creator #${item.authorId}`}
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;

