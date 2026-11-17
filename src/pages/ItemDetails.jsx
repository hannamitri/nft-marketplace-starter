import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [nftId]);

  return (
    <div id="wrapper" className="bg-white" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" 

    }}>
      <div className="no-bottom no-top" id="content" style={{ flex: "1" 

      }}>

        <section aria-label="section" className="container-fluid px-lg-5"
          style={{  }}>
          <div className="row g-5 align-items-center w-100 mx-auto"
            style={{
              paddingTop: "150px",
              paddingBottom: "80px",
              minHeight: "85vh",
              minWidth: "1600px"

            }}
            >
            {loading ? (
              <>
                {/* Left Column Skeleton */}
                <div className="col-lg-6 text-center">
                  <Skeleton width="100%" height="500px" borderRadius="16px" />
                </div>

                {/* Right Column Skeleton */}
                <div className="col-lg-6">
                  <Skeleton width="65%" height="44px" className="mb-3" />
                  <div className="d-flex gap-3 mb-4">
                    <Skeleton width="80px" height="32px" borderRadius="50px" />
                    <Skeleton width="80px" height="32px" borderRadius="50px" />
                  </div>
                  <Skeleton width="100%" height="90px" className="mb-4" />
                  <div className="d-flex gap-4 mb-4 pb-3 border-bottom border-light">
                    <div className="d-flex align-items-center gap-3">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <div>
                        <Skeleton width="60px" height="14px" className="mb-1" />
                        <Skeleton width="110px" height="18px" />
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <div>
                        <Skeleton width="60px" height="14px" className="mb-1" />
                        <Skeleton width="110px" height="18px" />
                      </div>
                    </div>
                  </div>
                  <Skeleton width="120px" height="36px" />
                </div>
              </>
            ) : item ? (
              <>
                {/* Left Column: NFT Image Display */}
                <div className="col-lg-6 text-center">
                  <div className="position-relative overflow-hidden rounded-4 shadow-sm border border-light">
                    <img
                      src={item.nftImage || item.image}
                      className="img-fluid w-100 object-fit-cover"
                      style={{ maxHeight: "550px" }}
                      alt={item.title || "NFT Detail"}
                    />
                  </div>
                </div>

                {/* Right Column: NFT Info & Details */}
                <div className="col-lg-6">
                  <div className="item_info ">
                    {/* Title & Stats */}
                    <h2 className="fw-bold fs-1 text-dark mb-3">
                      {item.title}
                    </h2>

                    <div className="d-flex align-items-center gap-3 mb-4">
                      <span className="badge bg-light text-dark border px-3 py-2 rounded-pill d-flex align-items-center gap-2">
                        <i className="fa fa-eye text-secondary"></i>
                        {item.views}
                      </span>
                      <span className="badge bg-light text-dark border px-3 py-2 rounded-pill d-flex align-items-center gap-2">
                        <i className="fa fa-heart text-danger"></i>
                        {item.likes}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Owner & Creator Details */}
                    <div className="d-flex flex-wrap gap-4 mb-4 pb-3 border-bottom border-light">
                      {/* Owner */}
                      <div className="d-flex align-items-center gap-3">
                        <div className="position-relative">
                          <Link to={`/author/${item.ownerId}`}>
                            <img
                              src={item.ownerImage}
                              alt={item.ownerName}
                              className="rounded-circle border border-2 border-white shadow-sm"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <i
                              className="fa fa-check position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center border border-2 border-white"
                              style={{ width: "14px", height: "14px", fontSize: "7px" }}
                            ></i>
                          </Link>
                        </div>
                        <div>
                          <span className="text-muted small d-block">Owner</span>
                          <Link
                            to={`/author/${item.ownerId}`}
                            className="text-decoration-none text-dark fw-bold hover-purple"
                          >
                            {item.ownerName}
                          </Link>
                        </div>
                      </div>

                      {/* Creator */}
                      <div className="d-flex align-items-center gap-3">
                        <div className="position-relative">
                          <Link to={`/author/${item.creatorId}`}>
                            <img
                              src={item.creatorImage}
                              alt={item.creatorName}
                              className="rounded-circle border border-2 border-white shadow-sm"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <i
                              className="fa fa-check position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center border border-2 border-white"
                              style={{ width: "14px", height: "14px", fontSize: "7px" }}
                            ></i>
                          </Link>
                        </div>
                        <div>
                          <span className="text-muted small d-block">Creator</span>
                          <Link
                            to={`/author/${item.creatorId}`}
                            className="text-decoration-none text-dark fw-bold hover-purple"
                          >
                            {item.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className="mt-4">
                      <span className="text-muted small d-block mb-1">Price</span>
                      <div className="d-flex align-items-center gap-2">
                        <img src={EthImage} alt="ETH" style={{ width: "20px", height: "20px" }} />
                        <span className="fw-bold fs-3 text-dark">{item.price} ETH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-12 text-center py-5">
                <h3>Item not found.</h3>
                <Link to="/explore" className="btn btn-primary rounded-pill px-4 mt-3">
                  Back to Explore
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;