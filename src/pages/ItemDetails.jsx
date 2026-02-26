import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  async function fetchdata() {
    setLoading(true);
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`)
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchdata();
  }, [id]);

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
                    <div className="placeholder-glow" style={{ height: "400px", borderRadius: "8px" }}>
                      <span className="placeholder w-100 h-100" style={{ borderRadius: "8px" }}></span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info placeholder-glow">
                      <span className="placeholder w-50 mb-3" style={{ height: "36px", borderRadius: "4px" }}></span>
                      <div className="d-flex gap-3 mb-3">
                        <span className="placeholder" style={{ width: "80px", height: "24px", borderRadius: "4px" }}></span>
                        <span className="placeholder" style={{ width: "80px", height: "24px", borderRadius: "4px" }}></span>
                      </div>
                      <span className="placeholder w-100 mb-2" style={{ height: "16px", borderRadius: "4px" }}></span>
                      <span className="placeholder w-100 mb-2" style={{ height: "16px", borderRadius: "4px" }}></span>
                      <span className="placeholder w-75 mb-4" style={{ height: "16px", borderRadius: "4px" }}></span>
                      <div className="d-flex flex-row mb-4">
                        <div className="mr40">
                          <span className="placeholder w-100 mb-2" style={{ width: "80px", height: "16px", borderRadius: "4px" }}></span>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <span className="placeholder" style={{ width: "50px", height: "50px", borderRadius: "50%", display: "block" }}></span>
                            </div>
                            <div className="author_list_info" style={{ marginLeft: "12px" }}>
                              <span className="placeholder" style={{ width: "100px", height: "16px", borderRadius: "4px" }}></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content mb-4">
                          <span className="placeholder mb-2" style={{ width: "60px", height: "16px", borderRadius: "4px" }}></span>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <span className="placeholder" style={{ width: "50px", height: "50px", borderRadius: "50%", display: "block" }}></span>
                            </div>
                            <div className="author_list_info" style={{ marginLeft: "12px" }}>
                              <span className="placeholder" style={{ width: "100px", height: "16px", borderRadius: "4px" }}></span>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <span className="placeholder mb-2" style={{ width: "50px", height: "16px", borderRadius: "4px" }}></span>
                        <div className="nft-item-price">
                          <span className="placeholder" style={{ width: "120px", height: "32px", borderRadius: "4px" }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                  <React.Fragment>
                  <div className="col-md-6 text-center">
                    <img
                      src={data.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                <div className="item_info">
                  <h2>{data.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {data.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {data.likes}
                    </div>
                  </div>
                  <p>
                    {data.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>{data.ownerName}</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${data.ownerId}`}>
                            <img className="lazy" src={data.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${data.ownerId}`}>{data.ownerName}</Link>
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
                          <Link to={`/author/${data.creatorId}`}>
                            <img className="lazy" src={data.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${data.creatorId}`}>{data.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{data.price}</span>
                    </div>
                  </div>
                </div>
              </div>
                  </React.Fragment>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
