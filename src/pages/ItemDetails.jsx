import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchItemDetails() {
      try {
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
        setPost(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000); 
      } catch (error) {
        console.error("Error fetching item details:", error);
        setLoading(false);
      }
    }
    fetchItemDetails();
  }, [id]); // Added id dependency array

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            
            {loading ? (
              /* LOADING SKELETON */
              <div className="row">
                <div className="col-md-6 text-center">
                  <div 
                    className="skeleton-image" 
                    style={{ width: '100%', height: '400px', borderRadius: '8px', background: '#ddd', animation: 'pulse 1.5s infinite' }}
                  ></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div style={{ width: '60%', height: '36px', background: '#ddd', marginBottom: '20px' }}></div>
                    <div className="item_info_counts" style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                      <div style={{ width: '60px', height: '20px', background: '#ddd' }}></div>
                      <div style={{ width: '60px', height: '20px', background: '#ddd' }}></div>
                    </div>
                    <div style={{ width: '100%', height: '80px', background: '#ddd', marginBottom: '20px' }}></div>
                    <div style={{ width: '40%', height: '50px', background: '#ddd' }}></div>
                  </div>
                </div>
              </div>
            ) : (
              /* ACTUAL CONTENT */
              post && (
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={post.nftImage || nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{post.title} #{post.tag}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {post.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {post.likes}
                        </div>
                      </div>
                      <p>{post.description}</p>
                      
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${post.ownerId}`}>
                                <img className="lazy" src={post.ownerImage || AuthorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              {/* Wrapped in curly braces for dynamic evaluation */}
                              <Link to={`/author/${post.ownerId}`}>{post.ownerName}</Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${post.creatorId}`}>
                                <img className="lazy" src={post.creatorImage || AuthorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${post.creatorId}`}>{post.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={post.EthImage || EthImage} alt="" />
                          <span>{post.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;