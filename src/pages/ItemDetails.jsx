import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { useState } from "react";
import axios from "axios";

const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorId } = useParams();

  async function getItemDetailsResponse() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${authorId}`
    );

    setItemDetails([data]);
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }
  console.log(itemDetails);

  useEffect(() => {
    window.scrollTo(0, 0);
    getItemDetailsResponse();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          {loading ? (
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="skeleton itemImage--style">
                    <img className="itemImage--skeleton"></img>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2 className="skeleton itemImage--title--skeleton"></h2>
                    <div className="item_info_counts">
                      <div className="skeleton itemImage--count--skeleton"></div>
                      <div className="skeleton itemImage--count--skeleton"></div>
                    </div>
                    <p className="skeleton itemImage--p--skeleton "></p>
                    <div className="d-flex flex-row">
                      <h6>Owner</h6>
                      <div className="item_author"></div>
                    </div>
                    <div className="itemImage--user--container">
                      <div className="skeleton itemImage--pp-skeleton"></div>
                      <div className="skeleton itemImage--owner--skeleton"></div>
                    </div>
                    <div className="d-flex flex-row">
                      <h6>Creator</h6>
                      <div className="item_author"></div>
                    </div>
                    <div className="itemImage--user--container">
                      <div className="skeleton itemImage--pp-skeleton"></div>
                      <div className="skeleton itemImage--owner--skeleton"></div>
                    </div>
                    <div className="d-flex flex-row itemImage--skeleton-col">
                      <h6>Price</h6>
                      <div className="skeleton itemImage--owner--skeleton itemImage--price--style"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            itemDetails.map((user, index) => (
              <div className="container" key={index}>
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={user.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {user.title} #{user.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {user.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {user.likes}
                        </div>
                      </div>
                      <p>{user.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${user.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={user.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{user.ownerName}</Link>
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
                            <Link to={`/author/${user.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={user.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{user.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{user.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
