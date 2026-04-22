import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`,
      { cache: "no-store" }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
        setLoading(false);
      });
  }, [itemId]);

  const skeletonStyle = {
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s ease infinite",
    borderRadius: "8px",
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <div style={{ ...skeletonStyle, height: "400px", borderRadius: "12px" }} />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div style={{ ...skeletonStyle, height: "36px", width: "70%", marginBottom: "16px" }} />
                    <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                      <div style={{ ...skeletonStyle, height: "24px", width: "80px" }} />
                      <div style={{ ...skeletonStyle, height: "24px", width: "80px" }} />
                    </div>
                    <div style={{ ...skeletonStyle, height: "16px", width: "100%", marginBottom: "8px" }} />
                    <div style={{ ...skeletonStyle, height: "16px", width: "90%", marginBottom: "8px" }} />
                    <div style={{ ...skeletonStyle, height: "16px", width: "80%", marginBottom: "24px" }} />
                    <div className="d-flex flex-row" style={{ gap: "40px", marginBottom: "24px" }}>
                      {["Owner", "Creator"].map((label) => (
                        <div key={label}>
                          <div style={{ ...skeletonStyle, height: "14px", width: "60px", marginBottom: "10px" }} />
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ ...skeletonStyle, height: "50px", width: "50px", borderRadius: "50%", flexShrink: 0 }} />
                            <div style={{ ...skeletonStyle, height: "14px", width: "90px" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ ...skeletonStyle, height: "14px", width: "60px", marginBottom: "10px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ ...skeletonStyle, height: "28px", width: "28px", borderRadius: "50%" }} />
                      <div style={{ ...skeletonStyle, height: "24px", width: "80px" }} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={data.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{data.title}</h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {data.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {data.likes}
                      </div>
                    </div>
                    <p>{data.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${data.ownerId}`}>
                              <img className="lazy" src={data.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${data.ownerId}`}>{data.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${data.creatorId}`}>
                              <img className="lazy" src={data.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${data.creatorId}`}>{data.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{data.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;