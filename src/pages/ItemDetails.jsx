import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SkeletonItemsDetailsPage from "../components/UI/SkeletonItemsDetailsPage";

const ItemDetails = () => {
  const { id } = useParams();
  const baseUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`;
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNftDetails = async () => {
    const { data } = await axios.get(`${baseUrl}`);
    setPost(data);
  };

  useEffect(() => {
    setLoading(true);
    if (id) {
      getNftDetails();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
              {loading ? <SkeletonItemsDetailsPage /> : 
            <div className="row">
                <div className="col-md-6 text-center">
                <img
                  src={post.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {post.title} #{post.tag}
                  </h2>

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
                            <img
                              className="lazy"
                              src={post.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${post.ownerId}`}>
                            {post.ownerName}
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
                          <Link to={`/author/${post.creatorId}`}>
                            <img
                              className="lazy"
                              src={post.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${post.creatorId}`}>
                            {post.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{post.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              }
              
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;