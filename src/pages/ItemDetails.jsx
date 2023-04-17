import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/css/home css/itemdetails.css"

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    setItem(response.data);
    setLoading(false);
    console.log(response.data);

    console.log(item);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {
              loading ? 
              (
                <div className="item__details--wrapper">
                  <div className="item__details--image-wrapper">
                  <div className="item__details--image"></div>
                  </div>
                  <div className="item__details--text-wrapper">
                    <div className="item__details--title"></div>
                    <div className="likes__views-wrapper">
                    <div className="item__details--likes"></div>
                    <div className="item__details--views"></div>
                    </div>
                    <div className="item__details--para-wrapper">
                      <div className="item__details--para"></div>
                      <div className="item__details--para"></div>
                      <div className="item__details--para-num2"></div>
                    </div>
                    <div className="item__details--owner-name"></div>
                    <div className="item__details--owner-img-wrapper">
                    <div className="item__details--owner-img"></div>
                    <div className="item__details--owner-text"></div>
                    </div>
                    <div className="item__details--owner-name"></div>
                    <div className="item__details--owner-img-wrapper">
                    <div className="item__details--owner-img"></div>
                    <div className="item__details--owner-text"></div>
                    </div>
                    <div className="item__details--owner-name"></div>
                  </div>
                </div>
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
                      <h2>
                        {item.title}#{item.tag}
                      </h2>

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
                      <p>{item.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.authorId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.authorId}`}>{item.ownerName}</Link>
                            </div>
                          </div>
                        </div>  
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.authorId}`}>
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.nftId}`}>{item.creatorName}</Link>
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
