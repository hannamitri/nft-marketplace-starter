import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";

/* Adding this change so pull request can be merged */

const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState(null);

  const { nftId } = useParams();

  async function fetchItemDetails() {
    const fetchDetails = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
    let receiveDetails = fetchDetails.data;
    setItemDetails(receiveDetails);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {itemDetails ? 
                <img
                src={itemDetails.nftImage}
                className="img-fluid img-rounded mb-sm-30 nft-image"
                alt=""
              />  : 
              <div className="skeleton-explore-wrapper">
                <div style={{width: '100%', height: '100%'}} className="skeleton skeleton-explore"></div>
              </div>
              }
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {itemDetails ? <h2>{ itemDetails.title } #{ itemDetails.tag}</h2> : <h2>Loading...</h2>}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      { itemDetails ? itemDetails && itemDetails.views : 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      { itemDetails ? itemDetails && itemDetails.likes : 0}
                    </div>
                  </div>
                  { itemDetails ? <p>{itemDetails.description}</p> : 
                      <>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                      </>
                  }
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails && itemDetails.ownerId}`}>
                            { itemDetails ? <img className="lazy" src={itemDetails.ownerImage} alt="" /> : 
                                <div className="skeleton skeleton-avatar"></div>
                            } 
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          { itemDetails ?  <Link to={`/author/${itemDetails && itemDetails.ownerId}`}>{itemDetails && itemDetails.ownerName}</Link> :
                            <>
                              <div className="skeleton skeleton-text"></div>
                              <div className="skeleton skeleton-text"></div>
                            </>
                          }
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
                          <Link to={`/author/${itemDetails && itemDetails.creatorId}`}>
                            { itemDetails ? <img className="lazy" src={itemDetails.creatorImage} alt="" /> : 
                              <div className="skeleton skeleton-avatar"></div>
                            } 
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          { itemDetails ?  <Link to={`/author/${itemDetails && itemDetails.creatorId}`}>{itemDetails && itemDetails.creatorName}</Link> :
                            <>
                              <div className="skeleton skeleton-text"></div>
                              <div className="skeleton skeleton-text"></div>
                            </>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemDetails ? itemDetails && itemDetails.price : 0}</span>
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
