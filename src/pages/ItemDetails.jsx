import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import "../css/styles/itemDetails.css";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const fetchDetails = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
        );
        setDetails(fetchDetails.data);
        console.log(fetchDetails.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getItemDetails();
  });

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading ? (
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center" data-aos="fade-right" data-aos-delay="200">
                  <div className="img-fluid img-rounded mb-sm-30 nft-image item__img--loading skeleton"></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info" data-aos="fade-left" data-aos-delay="200">
                    <h2 className="item__title--loading skeleton" data-aos-delay="300"></h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        <div className="item__views--loading skeleton"></div>
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        <div className="item__likes--loading skeleton"></div>
                      </div>
                    </div>
                    <p className="item__desc--loading skeleton"></p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6 className="label__loading skeleton"></h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div className="owner__img--loading skeleton"></div>
                          </div>
                          <div className="author_list_info">
                            <div className="owner__name--loading skeleton"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6 className="label__loading skeleton"></h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div className="owner__img--loading skeleton"></div>
                          </div>
                          <div className="author_list_info">
                            <div className="owner__name--loading skeleton"></div>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6 className="label__loading skeleton"></h6>
                      <div className="nft-item-price--loading">
                        <div className="price__icon--loading skeleton"></div>
                        <div className="item__price--loading skeleton"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          details && (
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center" data-aos="fade-right" data-aos-delay="200">
                    <img
                      src={details.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info" data-aos="fade-left" data-aos-delay="200">
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
                      <p>{details.description}</p>
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
                        {/* <div></div> */}
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
