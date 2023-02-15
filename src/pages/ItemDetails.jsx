import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation, useSearchParams  } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import LoadingPlaceHolder from '../components/home/LoadingPlaceHolder'

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const { itemId } = location.state;

  const [item, setItem] = useState([]);
  const [loaded, setLoaded] = useState(undefined);

  async function getData() {
    setLoaded(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
    );
    setItem(data);
    setLoaded(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
            {loaded ? (
                <>
                  <div className="col-md-6 text-center">
                    <LoadingPlaceHolder extraStyles={{height:'100%', width:'100%'}}/>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      
                        <LoadingPlaceHolder extraStyles={{height:'40px', width:'50%', marginTop: '20px'}}/>

                      <div className="item_info_counts">
                        
                        <LoadingPlaceHolder extraStyles={{height:'30px', width:'70px', marginTop: '20px'}}/>

                        <LoadingPlaceHolder extraStyles={{height:'30px', width:'70px', marginTop: '20px'}}/>

                      </div>
                      
                        <LoadingPlaceHolder extraStyles={{height:'70px', width:'100%', marginTop: '40px'}}/>

                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              
                              <LoadingPlaceHolder extraStyles={{height:'50px', width:'50px', borderRadius:'50%'}}/>

                            </div>
                            <div className="author_list_info">
                              
                              <LoadingPlaceHolder extraStyles={{height:'20px', width:'150px'}}/>

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
                              
                              <LoadingPlaceHolder extraStyles={{height:'50px', width:'50px', borderRadius:'50%'}}/>

                            </div>
                            <div className="author_list_info">
                              
                              <LoadingPlaceHolder extraStyles={{height:'20px', width:'150px'}}/>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                        
                          <LoadingPlaceHolder extraStyles={{height:'30px', width:'70px', marginTop: '40px'}}/>
                          
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
                      <h2>
                        {item.title} #{item.tag}
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
                              <Link
                                to={`/author/${item.ownerId}`}
                                state={{ authorId: item.ownerId }}
                              >
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link
                                to={`/author/${item.ownerId}`}
                                state={{ authorId: item.ownerId }}
                              >
                                {item.ownerName}
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
                              <Link
                                to={`/author/${item.creatorId}`}
                                state={{ authorId: item.creatorId }}
                              >
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link
                                to={`/author/${item.creatorId}`}
                                state={{ authorId: item.creatorId }}
                              >
                                {item.creatorName}
                              </Link>
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
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
