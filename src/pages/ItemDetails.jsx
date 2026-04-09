import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      )
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        setTimeout(() => {
          setItem(data || null);
        }, 1200);
      })
      .catch((error) => {
        console.error(error);
        setItem(null);
      });
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section className="mt90 sm-mt-0" data-aos="fade-up">
          <div className="container">
            <div className="row">

              {/* LEFT IMAGE */}
              <div className="col-md-6 text-center" data-aos="fade-right">
                {item ? (
                  <img
                    src={item.nftImage || nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                ) : (
                  <div
                    className="skeleton-box"
                    style={{ height: "400px" }}
                  ></div>
                )}
              </div>

              {/* RIGHT SIDE */}
              <div className="col-md-6" data-aos="fade-left">
                <div className="item_info">

                  {/* TITLE */}
                  {item ? (
                    <h2 data-aos="fade-up">{item.title}</h2>
                  ) : (
                    <div
                      className="skeleton-text"
                      style={{ height: "30px", width: "70%" }}
                    ></div>
                  )}

                  {/* COUNTS */}
                  <div className="item_info_counts" data-aos="fade-up" data-aos-delay="100">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item ? item.views : <span className="skeleton-text small"></span>}
                    </div>

                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item ? item.likes : <span className="skeleton-text small"></span>}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  {item ? (
                    <p data-aos="fade-up" data-aos-delay="200">
                      {item.description}
                    </p>
                  ) : (
                    <>
                      <div className="skeleton-text"></div>
                      <div className="skeleton-text"></div>
                      <div className="skeleton-text small"></div>
                    </>
                  )}

                  {/* OWNER */}
                  <div className="d-flex flex-row" data-aos="fade-up" data-aos-delay="300">
                    <div className="mr40">
                      <h6>Owner</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          {item ? (
                            <Link to={`/author/${item.ownerId}`}>
                              <img
                                className="lazy"
                                src={item.ownerImage || AuthorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <div className="skeleton-circle"></div>
                          )}
                        </div>

                        <div className="author_list_info">
                          {item ? (
                            <Link to={`/author/${item.ownerId}`}>
                              {item.ownerName}
                            </Link>
                          ) : (
                            <div className="skeleton-text small"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CREATOR */}
                  <div className="de_tab tab_simple" data-aos="fade-up" data-aos-delay="400">
                    <div className="de_tab_content">

                      <h6>Creator</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          {item ? (
                            <Link to={`/author/${item.creatorId}`}>
                              <img
                                className="lazy"
                                src={item.creatorImage || AuthorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <div className="skeleton-circle"></div>
                          )}
                        </div>

                        <div className="author_list_info">
                          {item ? (
                            <Link to={`/author/${item.creatorId}`}>
                              {item.creatorName}
                            </Link>
                          ) : (
                            <div className="skeleton-text small"></div>
                          )}
                        </div>
                      </div>

                    </div>

                    <div className="spacer-40"></div>

                    {/* PRICE */}
                    <h6>Price</h6>

                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      {item ? (
                        <span>{item.price}</span>
                      ) : (
                        <span className="skeleton-text small"></span>
                      )}
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