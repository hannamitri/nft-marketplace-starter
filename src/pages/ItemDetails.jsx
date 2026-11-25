import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import nftImage from "../images/nftImage.jpg";


const ItemDetails = () => {
  const { nftId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [item, setItem] = useState(null);
      
  useEffect(() => {
    window.scrollTo(0, 0);
    let active = true;

    const fetchItem = async () => {
      setLoading(true);
      setError("");
      setItem(null);

      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch NFT details");
        }
        const data = await response.json();
        if (active) {
          console.log("Fetched NFT details:", data);
          setItem(data);
        }
      } catch (error) {
        if (active) {
          console.error("Error fetching NFT details:", error);
          setError(error.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
      };
      if (nftId) {
        fetchItem();
      } else {
        setError("No NFT ID provided.");
        setLoading(false);
      }
      return () => {
        active = false;
      };
  }, [nftId]);

  if (!loading && error) {
    return <div className="container mt-5"> {error}</div>;
  }

  if (!loading && !item) {
    return <div className="container mt-5">NFT not found.</div>
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="450px" borderRadius="10px"/>
              ) : (
                <img
                  src={item?.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt="{nft.title}"
                />
              )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <Skeleton width="75%" height="35px" borderRadius="5px"/>
                  ) : (
                    
                  <h2>{item?.title} #{item?.tag}</h2>
                  )}
                  {loading ? (
                    <div style={{ display: "flex",
                      gap: "20px",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}>
                      <Skeleton width="80px" height="25px" borderRadius="5px" />
                      <Skeleton width="80px" height="25px" borderRadius="5px" />
                      </div>
                  ) : (
                    
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item?.views ?? 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item?.likes ?? 0}
                    </div>
                  </div>
                  
                  )}
                  {loading ? (
                    <div style={{ marginTop: "20px" }}>
                      <Skeleton width="100%" height="16px" borderRadius="5px" />
                      <div style={{ marginTop: "10px"}}>
                        <Skeleton width="100%" height="16px" borderRadius="5px" />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <Skeleton width="65%" height="16px" borderRadius="5px" />
                          </div>
                          </div>
                  ) : (
                    
                  <p>
                    {item?.description}
                  </p>
                  )}
                  {loading ? (
                    <div style={{ 
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      marginTop: "10px",
                    }}>
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <Skeleton width="130px" height="20px" borderRadius="5px" />
                      </div>
                      
                  ) : (
                    <>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item?.authorId}`}>
                            <img className="lazy" src={item?.nftImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.ownerId}`}>{item?.ownerName}</Link>
                          
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
                          <Link to={`/author/${item?.creatorId}`}>
                            <img className="lazy" src={item?.creatorImage} alt="" />
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.creatorId}`}>{item?.creatorName}</Link>
                          
                        </div>
                      </div>
                    </div>
                    </div>
                    </>
                    )}
                    {loading ? (
                      <Skeleton width="110px" height="30px" borderRadius="5px" />
                    ) : (
                      <>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item?.price}</span>
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
