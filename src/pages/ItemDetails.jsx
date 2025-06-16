import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [items, setItems] = useState({});
  const [Loading, setLoading] = useState(true);

  async function fetchNft() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      setItems(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNft();
  }, [nftId]);

  if (!nftId) return <div>NFT not found.</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {Loading ? (
                <>
                  <div className="col-md-6 text-center">
                  <Skeleton width={500} height={500} className="img-fluid img-rounded mb-sm-30 nft-image" alt="" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        <Skeleton width={350} height={50} />
                      </h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className=""></i>
                        </div>
                        <div className="item_info_like">
                          <i className=""></i>
                        </div>
                      </div>
                     <p><Skeleton width={400} height={75} /></p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                                <Skeleton width={50} height={50} borderRadius={99} />                                 
                              <Link to={`/author/${items.ownerId}`}>
                                <img className="lazy"alt=""/>
                              </Link>
                            </div>
                            <div className="author_list_info">
                               <Skeleton width={75} height={15} />  
                              <Link to={`/author/${items.ownerId}`}>
                              </Link>
                            </div>
                          </div>
                        </div>                        
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton width={50} height={50} borderRadius={99} />                                 
                              <Link to={`/author/${items.creatorId}`}>
                                <img className="lazy" alt=""/>
                              </Link>
                            </div>
                            <div className="author_list_info">
                               <Skeleton width={75} height={15} />  
                               </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <Skeleton width={100} height={15} />
                        <div className="nft-item-price">
                        </div>
                      </div>
                    </div>
                  </div>    
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={items.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {items.title} #{items.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {items.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {items.likes}
                        </div>
                      </div>
                      <p>{items.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${items.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={items.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${items.ownerId}`}>
                                {items.ownerName}
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
                              <Link to={`/author/${items.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={items.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${items.creatorId}`}>
                                {items.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{items.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              ;
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
