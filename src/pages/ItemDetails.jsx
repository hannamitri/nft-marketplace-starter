import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";


const ItemDetails = () => {
  const [itemDetailsData, setItemDetailsData] = useState([]);
  const [loading, setLoading] = useState(false);
  let { ItemDetailID } = useParams();
  
  
  async function fetchItemDetails() {
    setLoading(true)
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${ItemDetailID}`)
    setItemDetailsData(data)
    setLoading(false)

  }


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemDetails()
  }, []);

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
                  <Skeleton width="100%" height="100%" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="50%" height="40px" />
                    <div className="item_info_counts">
                      <Skeleton width="15%" height="30px" />
                      <Skeleton width="15%" height="30px" />
                    </div>
                    <Skeleton width="100%" height="100px" />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          </div>
                          <div className="author_list_info">
                            <Skeleton width="150px" height="30px" />
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
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width="150px" height="30px" />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <Skeleton width="20%" height="30px" />
                      </div>
                    </div>
                  </div>
                </div>
                </>
            ) : (
              <>
                <div className="col-md-6 text-center">
                  <img
                    src={itemDetailsData.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {itemDetailsData.title} #{itemDetailsData.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemDetailsData.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemDetailsData.likes}
                      </div>
                    </div>
                    <p>{itemDetailsData.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetailsData.ownerId}`}>
                              <img
                                className="lazy"
                                src={itemDetailsData.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetailsData.ownerId}`}>
                              {itemDetailsData.ownerName}
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
                            <Link to={`/author/${itemDetailsData.creatorId}`}>
                              <img
                                className="lazy"
                                src={itemDetailsData.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetailsData.creatorId}`}>
                              {itemDetailsData.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{itemDetailsData.price}</span>
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
