import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = ({ width, height, borderRadius }) => {

  const { nftId } = useParams();
  const [nft, setNft] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        const nftItem = res.data;
        console.log(nftItem);
        setNft(nftItem);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error.", error);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
  
    fetchData();
  }, [nftId]);


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {isLoading ? (
                  <Skeleton width={width} height="100%" borderRadius="2px" />
                ) : (
                  <img
                  src={nft.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
                )}
                
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {isLoading ? (
                    <Skeleton width="80%" height="35px" borderRadius="2px" />
                  ) : (
                    <h2>{nft.title} #{nft.tag}</h2>
                  )}
                  <div className="item_info_counts">
                    { isLoading ? (
                      <Skeleton width="20%" height="30px" borderRadius="2px" />
                    ) : (
                      <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nft.views}
                    </div>
                    )}
                    { isLoading ? (
                      <Skeleton width="20%" height="30px" borderRadius="2px" />
                    ) : (
                      <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nft.likes}
                    </div>
                    )}
                  </div>
                  { isLoading ? (
                    <Skeleton width={width} height="30px" borderRadius={borderRadius} />
                  ) : (
                    <p>
                    {nft.description}
                  </p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        { isLoading ? (
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        ) : (
                          <div className="author_list_pp">
                            <Link to={`/author/${nft.ownerId}`}>
                              <img className="lazy" src={nft.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                        )}
                        
                        { isLoading ? (
                          <Skeleton width={width} height={height} borderRadius={borderRadius} />
                        ) : (
                          <div className="author_list_info">
                          <Link to={`/author/${nft.ownerId}`}>{nft.ownerName}</Link>
                        </div>
                        )}
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          
                          { isLoading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${nft.creatorId}`}>
                            <img className="lazy" src={nft.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          { isLoading ? (
                            <Skeleton width={width} height={height} borderRadius={borderRadius} />
                          ) : (
                            <Link to={`/author/${nft.creatorId}`}>{nft.creatorName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    { isLoading ? (
                      <Skeleton width={width} height={height} borderRadius={borderRadius} />
                    ) : (
                      <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nft.price}</span>
                    </div>
                    )}
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
