import axios from "axios";
import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton";

const getFallbackItem = () => ({
  authorId: "Monica Lucas",
  authorImage: AuthorImage,
  nftImage,
  title: "Rainbow Style #194",
  price: 1.85,
  likes: 74,
  views: 100,
});

const ItemDetails = () => {
  const { nftId } = useParams();
  const { state } = useLocation();
  const [item, setItem] = useState(state?.item || null);
  const [loading, setLoading] = useState(Boolean(nftId) && !state?.item);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [nftId]);

  useEffect(() => {
    if (!nftId || state?.item?.nftId?.toString() === nftId) {
      return;
    }

    async function fetchItemDetails() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const matchingItem = data.find(
          (newItem) => newItem.nftId?.toString() === nftId
        );

        setItem(matchingItem || null);
      } catch (error) {
        console.error("Failed to fetch item details:", error);
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    fetchItemDetails();
  }, [nftId, state?.item]);

  const details = nftId ? item : getFallbackItem();
  const title = details?.title || "Item not found";
  const authorName = details?.authorId
    ? `Creator #${details.authorId}`
    : "Monica Lucas";
  const price = details?.price || 0;
  const likes = details?.likes || 0;
  const views = details?.views || details?.likes || 0;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              <div className="row">
                <div className="col-md-6">
                  <Skeleton width="100%" height="520px" borderRadius="10px" />
                </div>
                <div className="col-md-6">
                  <Skeleton width="65%" height="36px" />
                  <div className="spacer-20"></div>
                  <Skeleton width="100%" height="120px" />
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={details?.nftImage || nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={title}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{title}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {likes}
                      </div>
                    </div>
                    <p>
                      This NFT is part of the latest marketplace drop. Review
                      the creator profile, current price, and activity before
                      placing a bid.
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to="/author">
                              <img
                                className="lazy"
                                src={details?.authorImage || AuthorImage}
                                alt={authorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">{authorName}</Link>
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
                            <Link to="/author">
                              <img
                                className="lazy"
                                src={details?.authorImage || AuthorImage}
                                alt={authorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">{authorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
