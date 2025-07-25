import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorLink from "../components/utils/AuthorLink";
import EthImage from "../images/ethereum.svg";

const isValidAuthorId = (id) =>
  id && String(id).toLowerCase() !== "undefined" && !isNaN(Number(id));

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemData, setItemData] = useState(null);
  const [creatorItems, setCreatorItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchItem = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        const data = await res.json();
        setItemData(data);
      } catch (err) {
        console.error("❌ Failed to fetch item details:", err);
        setError(true);
      }
    };
    fetchItem();
  }, [nftId]);

  useEffect(() => {
    const fetchCreatorItems = async () => {
      if (itemData && isValidAuthorId(itemData.authorId)) {
        try {
          const res = await fetch(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
          );
          const data = await res.json();
          const filtered = data.filter(
            (item) => String(item.authorId) === String(itemData.authorId)
          );
          setCreatorItems(filtered);
        } catch (err) {
          console.error("❌ Failed to hydrate creator items from /explore:", err);
        }
      }
    };
    fetchCreatorItems();
  }, [itemData]);

  if (error)
    return (
      <div className="text-center py-5 text-danger">
        ⚠️ Unable to load item details. Please try again later.
      </div>
    );

  if (!itemData)
    return (
      <div className="text-center py-5 animate-pulse">
        Loading item...
      </div>
    );

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top" />
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* 🔻 Main Image */}
              <div className="col-md-6 text-center">
                <img
                  src={itemData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={itemData.title}
                />
              </div>

              {/* 🔻 Details */}
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemData.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye" />
                      {itemData.views || 100}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart" />
                      {itemData.likes}
                    </div>
                  </div>

                  <p>{itemData.description || "No description provided."}</p>

                  {/* 🔻 Owner */}
                  <h6>Owner</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      {isValidAuthorId(itemData.ownerId) ? (
                        <AuthorLink id={itemData.ownerId}>
                          <img
                            className="lazy"
                            src={itemData.ownerImage}
                            alt={itemData.ownerName}
                          />
                          <i className="fa fa-check" />
                        </AuthorLink>
                      ) : (
                        <span className="text-muted">Unknown Owner</span>
                      )}
                    </div>
                    <div className="author_list_info">
                      {isValidAuthorId(itemData.ownerId) ? (
                        <AuthorLink id={itemData.ownerId}>
                          {itemData.ownerName}
                        </AuthorLink>
                      ) : (
                        <span className="text-muted">Unverified</span>
                      )}
                    </div>
                  </div>

                  {/* 🔻 Creator */}
                  <h6 style={{marginTop:"30px"}}>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      {isValidAuthorId(itemData.creatorId) ? (
                        <AuthorLink id={itemData.creatorId}>
                          <img
                            className="lazy"
                            src={itemData.creatorImage}
                            alt={itemData.creatorName}
                          />
                          <i className="fa fa-check" />
                        </AuthorLink>
                      ) : (
                        <span className="text-muted">Unknown Creator</span>
                      )}
                    </div>
                    <div className="author_list_info">
                      {isValidAuthorId(itemData.creatorId) ? (
                        <AuthorLink id={itemData.creatorId}>
                          {itemData.creatorName}
                        </AuthorLink>
                      ) : (
                        <span className="text-muted">Unverified</span>
                      )}
                    </div>
                  </div>

                  {/* 💰 Price */}
                  <div className="spacer-40"></div>
                  <h6>Price</h6>
                  <div className="nft-item-price">
                    <img src={EthImage} alt="ETH" />
                    <span>{itemData.price} ETH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 🔁 Creator’s Other NFTs */}
            {creatorItems.length > 1 && (
              <>
                <div className="spacer-double"></div>
                <h3 className="text-center mb-4">More from this creator</h3>
                <div className="row">
                  {creatorItems
                    .filter((item) => item.nftId !== itemData.nftId)
                    .map((item) => (
                      <div
                        key={item.nftId}
                        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      >
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <AuthorLink id={item.authorId}>
                              <img
                                className="lazy"
                                src={item.authorImage}
                                alt={item.authorName}
                              />
                              <i className="fa fa-check" />
                            </AuthorLink>
                          </div>
                          <div className="nft__item_wrap">
                            <div className="nft__item_extra">
                              <div className="nft__item_buttons">
                                <button>Buy Now</button>
                                <div className="nft__item_share">
                                  <h4>Share</h4>
                                  <a href="#"><i className="fa fa-facebook fa-lg" /></a>
                                  <a href="#"><i className="fa fa-twitter fa-lg" /></a>
                                  <a href="#"><i className="fa fa-envelope fa-lg" /></a>
                                </div>
                              </div>
                            </div>
                            <a href={`/item-details/${item.nftId}`}>
                              <img
                                src={item.nftImage}
                                className="lazy nft__item_preview"
                                alt={item.title}
                              />
                            </a>
                          </div>
                          <div className="nft__item_info">
                            <a href={`/item-details/${item.nftId}`}>
                              <h4>{item.title}</h4>
                            </a>
                            <div className="nft__item_price">{item.price} ETH</div>
                            <div className="nft__item_like">
                              <i className="fa fa-heart" />
                              <span>{item.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;