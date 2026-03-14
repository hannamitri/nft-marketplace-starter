import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!nftId) return;

    setLoading(true);
    setError("");

    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
    )
      .then(async (res) => {
        const text = await res.text();
        if (!text) return null;
        return JSON.parse(text);
      })
      .then((data) => {
        if (!data) {
          setError("No item details returned.");
          setItem(null);
          return;
        }

        const itemData = Array.isArray(data) ? data[0] : data;
        setItem(itemData);
      })
      .catch((err) => {
        console.error("item details api error:", err);
        setError("Failed to load item details.");
      })
      .finally(() => setLoading(false));
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {error && <div style={{ padding: 12, color: "red" }}>{error}</div>}

            <div className="row">
              {/* LEFT SIDE IMAGE */}
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="450px" borderRadius="12px" />
                ) : (
                  <img
                    src={item?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>

              {/* RIGHT SIDE INFO */}
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <>
                      <Skeleton width="70%" height="28px" borderRadius="8px" />

                      <div
                        style={{
                          marginTop: 12,
                          display: "flex",
                          gap: 16,
                        }}
                      >
                        <Skeleton
                          width="90px"
                          height="18px"
                          borderRadius="8px"
                        />
                        <Skeleton
                          width="90px"
                          height="18px"
                          borderRadius="8px"
                        />
                      </div>

                      <div style={{ marginTop: 16 }}>
                        <Skeleton
                          width="100%"
                          height="70px"
                          borderRadius="8px"
                        />
                      </div>

                      <div style={{ marginTop: 24 }}>
                        <Skeleton
                          width="160px"
                          height="18px"
                          borderRadius="8px"
                        />
                      </div>

                      <div style={{ marginTop: 24 }}>
                        <Skeleton
                          width="160px"
                          height="18px"
                          borderRadius="8px"
                        />
                      </div>

                      <div style={{ marginTop: 24 }}>
                        <Skeleton
                          width="100px"
                          height="20px"
                          borderRadius="8px"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <h2>
                        {item?.title} #{item?.tag}
                      </h2>

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

                      <p>{item?.description}</p>

                      {/* OWNER */}
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item?.authorId}`}>
                                <img
                                  className="lazy"
                                  src={
                                    item?.ownerImage ||
                                    item?.authorImage ||
                                    AuthorImage
                                  }
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item?.authorId}`}>
                                {item?.ownerName ??
                                  item?.authorName ??
                                  "Unknown"}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CREATOR */}
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item?.authorId}`}>
                                <img
                                  className="lazy"
                                  src={
                                    item?.creatorImage ||
                                    item?.authorImage ||
                                    AuthorImage
                                  }
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item?.authorId}`}>
                                {item?.creatorName ??
                                  item?.authorName ??
                                  "Unknown"}
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="spacer-40"></div>

                        {/* PRICE */}
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{item?.price ?? 0}</span>
                        </div>
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
