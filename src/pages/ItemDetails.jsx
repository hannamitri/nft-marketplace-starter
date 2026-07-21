import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const [loading, setLoading] = useState(true);
  const [itemDetails, setItemsDetails] = useState({});

  const { nftId } = useParams();

  async function fetchItemDetails(nftId) {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      setItemsDetails(data);
    } catch (error) {
      console.error("There was an error fetching the item details", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemDetails(nftId);
  }, [nftId]);

  const {
    title,
    description,
    creatorName,
    creatorImage,
    creatorId,
    likes,
    nftImage,
    ownerName,
    ownerImage,
    ownerId,
    price,
    views,
  } = itemDetails;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <div className="item__img__skeleton skeleton" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2 className="item__title--skeleton skeleton" />
                      <div className="item_info_counts">
                        <div className="item__views--skeleton skeleton">
                          <i className="fa fa-eye"></i>
                        </div>
                        <div className="item__likes--skeleton skeleton">
                          <i className="fa fa-heart"></i>
                        </div>
                      </div>
                      <div className="item__description--skeleton skeleton" />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div className="item__ownerImg--skeleton skeleton" />
                            </div>
                            <div className="author_list_info">
                              <div className="item__ownerName--skeleton skeleton" />
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
                              <div className="item__creatorImg--skeleton skeleton" />
                            </div>
                            <div className="author_list_info">
                              <div className="item__creatorName--skeleton skeleton" />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="item__price--skeleton skeleton" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
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
                      <p>{description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${ownerId}`}>
                                <img
                                  className="lazy"
                                  src={ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${ownerId}`}>
                                {ownerName}
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
                              <Link to={`/author/${creatorId}`}>
                                <img
                                  className="lazy"
                                  src={creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${creatorId}`}>
                                {creatorName}
                              </Link>
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