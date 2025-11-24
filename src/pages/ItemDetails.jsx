import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EthImage from "../images/ethereum.svg";

import AOS from "aos";
import "aos/dist/aos.css";

const skeletonBox = {
  background: "#e2e5e7",
  borderRadius: "10px",
  width: "100%",
  margin: "8px 0",
  minHeight: "20px",
};

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleLoad = () => {
      AOS.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  });

  useEffect(() => {
    if (!nftId) return;
    setLoading(true);
    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top" />
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <div
                    style={{
                      ...skeletonBox,
                      height: "360px",
                      borderRadius: "16px",
                      margin: "0 auto",
                    }}
                  />
                ) : (
                  <img
                    src={item?.nftImage}
                    alt={item?.title}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    data-aos="fade-down"
                    data-aos-delay="200"
                  />
                )}
              </div>
              <div className="col-md-6">
                <div
                  className="item_info"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  {loading ? (
                    <div
                      style={{
                        ...skeletonBox,
                        width: "70%",
                        minHeight: "28px",
                      }}
                    />
                  ) : (
                    <h2>{item?.title}</h2>
                  )}
                  <div className="item_info_counts">
                    {loading ? (
                      <>
                        <div
                          style={{
                            ...skeletonBox,
                            width: "80px",
                            display: "inline-block",
                          }}
                        />
                        <div
                          style={{
                            ...skeletonBox,
                            width: "80px",
                            display: "inline-block",
                            marginLeft: "11px",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <div className="item_info_views">
                          <i className="fa fa-eye" /> {item?.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart" /> {item?.likes}
                        </div>
                      </>
                    )}
                  </div>
                  {loading ? (
                    <>
                      <div style={skeletonBox} />
                      <div style={skeletonBox} />
                      <div style={{ ...skeletonBox, width: "80%" }} />
                    </>
                  ) : (
                    <p>{item?.description}</p>
                  )}

                  <div style={{ marginTop: "28px" }}>
                    <div style={{ marginBottom: "16px" }}>
                      <h6 style={{ fontWeight: "600", marginBottom: "6px" }}>
                        Owner
                      </h6>
                      {loading ? (
                        <div
                          style={{
                            ...skeletonBox,
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        <Link
                          to={`/author/${item?.ownerId}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            textDecoration: "none",
                          }}
                        >
                          <img
                            src={item?.ownerImage}
                            alt={item?.ownerName}
                            className="lazy"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                          <span
                            style={{
                              color: "#000",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                          >
                            {item?.ownerName}
                          </span>
                          <i
                            className="fa fa-check"
                            style={{ color: "#7C4DFF" }}
                          />
                        </Link>
                      )}
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <h6 style={{ fontWeight: "600", marginBottom: "6px" }}>
                        Creator
                      </h6>
                      {loading ? (
                        <div
                          style={{
                            ...skeletonBox,
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        <Link
                          to={`/author/${item?.creatorId}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            textDecoration: "none",
                          }}
                        >
                          <img
                            src={item?.creatorImage}
                            alt={item?.creatorName}
                            className="lazy"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                          <span
                            style={{
                              color: "#000",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                          >
                            {item?.creatorName}
                          </span>
                          <i
                            className="fa fa-check"
                            style={{ color: "#7C4DFF" }}
                          />
                        </Link>
                      )}
                    </div>

                    <div>
                      <h6 style={{ fontWeight: "600", marginBottom: "6px" }}>
                        Price
                      </h6>
                      {loading ? (
                        <div
                          style={{
                            ...skeletonBox,
                            width: "120px",
                            minHeight: "32px",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <img
                            src={EthImage}
                            alt="ETH"
                            style={{ height: "20px" }}
                          />
                          <span style={{ fontSize: "18px", fontWeight: "600" }}>
                            {item?.price}
                          </span>
                        </div>
                      )}
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
