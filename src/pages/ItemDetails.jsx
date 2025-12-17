import React, { useEffect, useRef, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = ({loading, setLoading}) => {
  const [itemDetails, setItemDetails] = useState({});
  const {id} = useParams();
  const mounted = useRef(false)

  




  useEffect(() => {
    mounted.current = true
    async function getItems(){
    setLoading(true);
    await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`)
      .then(res =>{
        const response= res.data;
        if(mounted.current){

        setItemDetails(response);
        setLoading(false);
        }
      })
      .catch(err =>{
        console.log('error retrieving data', err);
      })
  }

  getItems()

  return()=>{
    mounted.current = false;
  };
    window.scrollTo(0, 0);
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
                  <div className="skeleton-box" style={{height: 530, width: 458}}></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div className="skeleton-box" style={{height: 30, width: 300}}></div>

                  
                    <div className="skeleton-box" style={{height: 70, width: 400}}></div>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              <div className="skeleton-box" style={{height: 50, width: 50, borderRadius: '50%'}}></div>
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <div className="skeleton-box" style={{height: 21, width: 78}}></div>
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
                              <div className="skeleton-box" style={{height: 50, width: 50, borderRadius: '50%'}}></div>
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <div className="skeleton-box" style={{height: 21, width: 128}}></div>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <div className="skeleton-box" style={{height: 30, width: 100}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                </>
              ) : (
                <>
                <div className="col-md-6 text-center">
                  <img
                    src={itemDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{itemDetails.title} #{itemDetails.tag}</h2>

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
