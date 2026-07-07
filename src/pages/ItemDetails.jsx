import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import useItemDetails from "../hooks/useItemDetails";

const ItemDetails = () => {
  const { nftId } = useParams();
  const { data: item, loading } = useItemDetails(nftId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <div className="skeleton" style={{ width: "100%", height: "400px", borderRadius: "8px" }}></div>
                ) : (
                  <img src={item.nftImage} className="img-fluid img-rounded mb-sm-30 nft-image" alt={item.title} />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <>
                      <div className="skeleton" style={{ width: "60%", height: "30px", marginBottom: "16px" }}></div>
                      <div className="skeleton" style={{ width: "40%", height: "20px", marginBottom: "16px" }}></div>
                      <div className="skeleton" style={{ width: "100%", height: "80px", marginBottom: "16px" }}></div>
                      <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%", marginBottom: "8px" }}></div>
                      <div className="skeleton" style={{ width: "120px", height: "20px", marginBottom: "16px" }}></div>
                      <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%", marginBottom: "8px" }}></div>
                      <div className="skeleton" style={{ width: "120px", height: "20px", marginBottom: "16px" }}></div>
                      <div className="skeleton" style={{ width: "80px", height: "24px" }}></div>
                    </>
                  ) : (
                    <>
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
                      <p>{item.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.ownerId}`}>
                                <img className="lazy" src={item.ownerImage} alt={item.ownerName} />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.creatorId}`}>
                                <img className="lazy" src={item.creatorImage} alt={item.creatorName} />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{item.price} ETH</span>
                        </div>
                      </div>
                    </>
                  )}
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