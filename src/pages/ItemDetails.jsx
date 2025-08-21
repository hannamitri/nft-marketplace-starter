import React, { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getItemDetailData() {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
      console.log("itemDetails:", data);
      setItemDetails(data);
    }
    catch {
      console.log("Error Fetching API Data");
    }
    finally {
      setLoading(false)
    }
  };

  function itemDetailSkeleton() {
    return (
      <>
      <div className="col-md-6 text-center">
        <div className="img-fluid img-rounded mb-sm-30 nft-image skeleton-box" style={{minWidth: "500px", minHeight: "312px", borderRadius: "5px"}}></div>
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <h2 className="skeleton-box" style={{ maxWidth: "276px", marginTop: "8px", borderRadius: "5px"}}></h2>
          <div className="item_info_counts">
            <div className="item_info_views skeleton-box" style={{backgroundColor: "#ddd", minHeight: "30px"}}>
            </div>
            <div className="item_info_like skeleton-box" style={{backgroundColor: "#ddd", minHeight: "30px"}}>
            </div>
          </div>
          <p>
            <div className="skeleton-box" style={{ width: "90%", height: "14px", marginBottom: "4px"}}></div>
            <div className="skeleton-box" style={{ width: "90%", height: "14px", marginBottom: "4px"}}></div>
            <div className="skeleton-box" style={{ width: "90%", height: "14px", marginBottom: "4px"}}></div>
            <div className="skeleton-box" style={{ width: "80%", height: "14px", marginBottom: "4px"}}></div>
          </p><h6>Owner</h6>
          <div className="d-flex flex-row" style={{marginBottom: "16px", display: "flex", flexDirection: 'column'}}>
            <div className="skeleton-box" style={{ width: "100%", maxWidth: "72px", height: "72px", borderRadius: "100%" }}></div>
            <div className="skeleton-box" style={{ width: "100%", maxWidth: "64px", display: "flex", alignSelf: "center", marginLeft: "16px"}}></div>
          </div> 
          <h6>Creator</h6>
          <div className="d-flex flex-row">            <div className="skeleton-box" style={{ width: "100%", maxWidth: "72px", height: "72px", borderRadius: "100%" }}></div>
            <div className="skeleton-box" style={{ width: "100%", maxWidth: "64px", display: "flex", alignSelf: "center", marginLeft: "16px"}}></div>
          </div>
          <div className="spacer-40"></div>
          <h6>Price</h6>
          <div className="nft-item-price">
            
            <div className="skeleton-box" style={{width: "100%", maxWidth: "88px",minHeight: "30px", borderRadius: "5px"}}></div>
          </div>
        </div>
      </div>
      </>
    )
  }

  useEffect(() => {
    getItemDetailData();
  }, []);

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
              
              {itemDetails && !loading ? (<> 
              <div className="col-md-6 text-center">
                <img
                  src={itemDetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2><span>{itemDetails.title} </span> #{itemDetails.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetails.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetails.likes}
                    </div>
                  </div>
                  <p>
                    {itemDetails.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.ownerId}`}>
                            <img className="lazy" src={itemDetails.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.ownerId}`}>{itemDetails.ownerName}</Link>
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
                          <Link to={`/author/${itemDetails.creatorId}`}>
                            <img className="lazy" src={itemDetails.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.creatorId}`}>{itemDetails.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemDetails.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              </>
            ) : 
            (itemDetailSkeleton())}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
