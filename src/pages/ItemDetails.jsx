import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nftId } = useParams();
  const [authorData, setAuthorData] = useState(null);


  useEffect(() => {
    const fetchAuthorData = async () => {
      setIsLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
      setAuthorData(data);
      setIsLoading(false); 
  };

    fetchAuthorData();
  }, [nftId]);

  if (error) return <p>Error: {error}</p>;
  
  const skeletonItems = Array.from({ length: 1 });

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={authorData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
                      {isLoading ? (
                        skeletonItems.map((_, index) => (
                          <div className="col-md-12" key={index}>
                            <div className="d_profile de-flex">
                              <div className="de-flex-col">
                                <Skeleton width="100%" height="180px" borderRadius="12px" />
                              </div>
                              <div className="profile_avatar">
                                <Skeleton width="60px" height="60px" borderRadius="50%" />
                              </div>
                              <div className="profile_name">
                                <Skeleton width="70%" height="20px" borderRadius="6px" />
                                <Skeleton width="40%" height="16px" borderRadius="6px" />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                  <div className="item_info">
                    <h2>{authorData.title}</h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {authorData.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                         {authorData.likes}
                      </div>
                    </div>
                    <p>
                     {authorData.description}
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to="/author">
                              <img className="lazy" src={authorData.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">{authorData.ownerName}</Link>
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
                            <Link to="/author">
                              <img className="lazy" src={authorData.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">{authorData.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{authorData.price}</span>
                      </div>
                    </div>
                  </div>
                )}
                </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
