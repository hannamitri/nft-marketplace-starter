import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams} from "react-router-dom";
import axios from "axios";
import "./ItemDetails.css";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {nftId} = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchItemDetails()
    {
      const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
      setItem(response.data);
      setLoading(false);
    }

    fetchItemDetails();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">

            {
              loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <div className="skeleton_big_img"></div>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <div className="skeleton_nft_title"></div>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <div className="skeleton_view"></div>
                        </div>
                        <div className="item_info_like">
                          <div className="skeleton_view"></div>
                        </div>
                      </div>
                      <p>
                        <div className="skeleton_description1"></div>
                        <div className="skeleton_description2"></div>
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <div className="skeleton_owner"></div>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                                <div className="skeleton_profile_pic"></div>
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <div className="skeleton_person_name"></div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                        <div className="skeleton_owner"></div>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                              <div className="skeleton_profile_pic"></div>
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                            <div className="skeleton_person_name"></div>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <div className="skeleton_price"></div>
                        <div className="nft-item-price">
                          <div className="skeleton_price_tag"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{item.title}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>
                      <p>
                        {item.description}
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                                <img className="lazy" src={item.ownerImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{item.ownerName}</Link>
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
                                <img className="lazy" src={item.creatorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{item.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            }
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
