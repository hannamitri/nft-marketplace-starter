import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import Skeleton from "../components/UI/Skeleton.jsx";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nftDetails, setNftDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const resultData = response.data;

        if (Array.isArray(resultData)) {
          setNftDetails(resultData);
        } else if (resultData && typeof resultData === "object") {
          setNftDetails([resultData]);
        } else {
          setError("No data found for this NFT");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Failed to fetch data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
     window.scrollTo(0, 0);
  }, [nftId]);

  if (loading) {
    return (
      <div className="container mt-5">
        {new Array(1).fill(0).map((_, index) => (
          <div className="row" key={index} style={{ marginTop: "170px" }}>
            <div className="col-md-6 text-center">
              <Skeleton width="100%" height="100%" borderRadius="10px" />
            </div>
            <div className="col-md-6">
              <div className="item_info">
                <h2>
                  <Skeleton width="65%" height="40px" borderRadius="10px" />
                </h2>
                <div className="item_info_counts">
                  <div className="item_info_views">
                    <Skeleton width="100%" height="100%" borderRadius="10px" />
                  </div>
                  <div className="item_info_like">
                    <Skeleton width="100%" height="100%" borderRadius="10px" />
                  </div>
                </div>
                <p>
                  <Skeleton width="100%" height="100px" borderRadius="10px" />
                </p>
                <div className="d-flex flex-row">
                  <div className="mr40">
                    <h6>Owner</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info" style={{ width: "40%" }}>
                        <Skeleton
                          width="150px"
                          height="30px"
                          borderRadius="10px"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=""></div>
                </div>
                <div className="de_tab tab_simple">
                  <div className="de_tab_content">
                    <h6>Creator</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <i className="fa fa-check"></i>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>
                      <div className="author_list_info" style={{ width: "40%" }}>
                        <Skeleton
                          width="150px"
                          height="30px"
                          borderRadius="10px"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="spacer-40"></div>
                  <h6>Price</h6>
                  <div className="nft-item-price">
                    <Skeleton width="20%" height="30px" borderRadius="5px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="Error">{error}</div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          {nftDetails.length > 0 ? (
            <div className="container">
              {nftDetails.map((item, index) => (
                <div className="row" key={index}>
                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt={item.title || "NFT image"}
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
                      <p>{item.description || "No description available"}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt="Owner"
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.ownerId}`}>
                                {item.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className=""></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt="Creator"
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.creatorId}`}>
                                {item.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="Ethereum" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              No items found for this NFT ID.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
