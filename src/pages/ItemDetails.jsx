import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import { useItemDetails } from "../hooks/useItemDetails";



const ItemDetails = () => {
  const { nftId } = useParams();
  const { nft, loading, error } = useItemDetails(nftId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);




  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">

                {/* Skeleton NFT image */}
                <div className="col-md-6 text-center">
                  <div
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.5s infinite",
                    }}
                  ></div>
                </div>

                {/* Skeleton info panel */}
                <div className="col-md-6">
                  <div className="item_info">

                    {/* Skeleton title */}
                    <div
                      style={{
                        width: "60%",
                        height: "32px",
                        borderRadius: "6px",
                        marginBottom: "16px",
                        background:
                          "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                      }}
                    ></div>

                    {/* Skeleton views + likes */}
                    <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                      {[80, 60].map((w, i) => (
                        <div
                          key={i}
                          style={{
                            width: `${w}px`,
                            height: "20px",
                            borderRadius: "4px",
                            background:
                              "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.5s infinite",
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Skeleton description lines */}
                    {[100, 90, 75].map((w, i) => (
                      <div
                        key={i}
                        style={{
                          width: `${w}%`,
                          height: "14px",
                          borderRadius: "4px",
                          marginBottom: "8px",
                          background:
                            "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer 1.5s infinite",
                        }}
                      ></div>
                    ))}

                    {/* Skeleton owner/creator avatars */}
                    {["Owner", "Creator"].map((label) => (
                      <div key={label} style={{ marginTop: "24px" }}>
                        <div
                          style={{
                            width: "60px",
                            height: "14px",
                            borderRadius: "4px",
                            marginBottom: "10px",
                            background:
                              "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.5s infinite",
                          }}
                        ></div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              background:
                                "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer 1.5s infinite",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "100px",
                              height: "14px",
                              borderRadius: "4px",
                              background:
                                "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer 1.5s infinite",
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}

                    {/* Skeleton price */}
                    <div
                      style={{
                        width: "120px",
                        height: "28px",
                        borderRadius: "4px",
                        marginTop: "32px",
                        background:
                          "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                      }}
                    ></div>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div
                  className="col-md-12 text-center"
                  style={{ padding: "80px 0" }}
                >
                  <p>Error: {error}</p>
                  <button
                    className="btn-main"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }


  if (!nft) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div
                  className="col-md-12 text-center"
                  style={{ padding: "80px 0" }}
                >
                  <p>Item not found.</p>
                  <Link to="/" className="btn-main">
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">

              {/* NFT Image */}
              <div className="col-md-6 text-center">
                <img
                  src={nft.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nft.title}
                />
              </div>

              {/* NFT Info */}
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nft.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nft.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nft.likes}
                    </div>
                  </div>

                  <p>{nft.description}</p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {/* Owner → /author/{authorId} */}
                          <Link to={`/author/${nft.ownerId}`}>
                            <img
                              className="lazy"
                              src={nft.ownerImage}
                              alt={nft.ownerName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.ownerId}`}>
                            {nft.ownerName}
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
                          {/* Creator → /author/{authorId} */}
                          <Link to={`/author/${nft.creatorId}`}>
                            <img
                              className="lazy"
                              src={nft.creatorImage}
                              alt={nft.creatorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.creatorId}`}>
                            {nft.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{nft.price}</span>
                    </div>
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