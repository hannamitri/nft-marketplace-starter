import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import LoadingState from "../components/LoadingState.css";

const ItemDetails = () => {
  const { Id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDetails() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${Id}`
      );
      setDetails(data);
      setLoading(false);
    }
    getDetails();
  }, [Id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading ? (
          <div className="skeleton__item-wrapper">
            <div className="skeleton__item-left skeleton"></div>
            <div className="skeleton__item-right">
              <div className="skeleton__item-title skeleton"></div>
              <div className="skeleton__item-block-wrapper">
                <div className="skeleton__item-block skeleton"></div>
                <div className="skeleton__item-block skeleton"></div>
              </div>
              <div className="skeleton__item-para skeleton"></div>
              <div className="skeleton__item-people">
                <div className="skeleton__item-artist skeleton"></div>
                <div className="skeleton__item-artist-info">
                  <div className="skeleton__item-artist-pic skeleton"></div>
                  <div className="skeleton__item-artist-name skeleton"></div>
                </div>
                <div className="skeleton__item-artist skeleton"></div>
                <div className="skeleton__item-artist-info">
                  <div className="skeleton__item-artist-pic skeleton"></div>
                  <div className="skeleton__item-artist-name skeleton"></div>
                </div>
              </div>
              <div className="skeleton__item-price-title skeleton"></div>
              <div className="skeleton__item-price skeleton"></div>
            </div>
          </div>
        ) : (
          details && (
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={details.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {details.title} #{details.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {details.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {details.likes}
                        </div>
                      </div>
                      <p>
                        doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${details.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={details.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.ownerId}`}>
                                {details.ownerName}
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
                              <Link to={`/author/${details.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={details.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.creatorId}`}>
                                {details.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{details.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
