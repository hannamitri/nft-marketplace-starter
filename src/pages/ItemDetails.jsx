import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItem = async () => {
      setLoading(true);

      try {
        let foundItem = null;

        try {
          const exploreRes = await axios.get(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
          );

          const exploreItems = Array.isArray(exploreRes.data)
            ? exploreRes.data
            : [];

          foundItem =
            exploreItems.find(
              (entry) => String(entry.nftId || entry.nft_id) === String(nftId)
            ) || null;
        } catch (err) {
          console.error("Explore API failed:", err);
        }

        try {
          const detailRes = await axios.get(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
          );

          const detailData = Array.isArray(detailRes.data)
            ? detailRes.data
            : [detailRes.data];

          const matchedDetail =
            detailData.find(
              (entry) => String(entry?.nftId || entry?.nft_id) === String(nftId)
            ) || null;

          if (matchedDetail) {
            foundItem = { ...foundItem, ...matchedDetail };
          }
        } catch (err) {
          console.error("ItemDetails API failed:", err);
        }

        setItem(foundItem);
      } catch (error) {
        console.error("Error fetching item:", error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    if (nftId) {
      fetchItem();
    }
  }, [nftId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div
                    className="skeleton skeleton-img"
                    style={{
                      width: "100%",
                      height: "500px",
                      borderRadius: "12px",
                    }}
                  ></div>
                </div>

                <div className="col-md-6">
                  <div className="skeleton skeleton-text short mb-3"></div>
                  <div className="skeleton skeleton-text mb-2"></div>
                  <div className="skeleton skeleton-text mb-4"></div>

                  <div className="skeleton skeleton-text short mb-2"></div>
                  <div className="skeleton skeleton-text short mb-4"></div>

                  <div className="skeleton skeleton-text short mb-2"></div>
                  <div className="skeleton skeleton-text short"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return <div style={{ textAlign: "center" }}>Item not found</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton
                  src={item.nftImage || item.nft_image}
                  alt={item.title}
                  wrapperStyle={{
                    height: "600px",
                    borderRadius: "12px",
                  }}
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <p>{item.description || "No description available."}</p>

                  <h6>Price</h6>
                  <div className="nft-item-price">
                    <img src={EthImage} alt="ETH" />
                    <span>{Number(item.price || 0).toFixed(2)}</span>
                  </div>

                  {(item.ownerName || item.owner_name) && (
                    <div style={{ marginTop: "30px" }}>
                      <h6>Owner</h6>
                      <Link
                        to={`/author/${item.ownerId || item.owner_id}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          textDecoration: "none",
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <Skeleton
                            src={
                              item.ownerImage ||
                              item.owner_image ||
                              item.authorImage ||
                              item.author_image
                            }
                            alt={item.ownerName || item.owner_name || "owner"}
                            className="pp-author"
                            wrapperStyle={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <span>{item.ownerName || item.owner_name}</span>
                      </Link>
                    </div>
                  )}

                  {(item.creatorName || item.creator_name) && (
                    <div style={{ marginTop: "20px" }}>
                      <h6>Creator</h6>
                      <Link
                        to={`/author/${item.creatorId || item.creator_id}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          textDecoration: "none",
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <Skeleton
                            src={
                              item.creatorImage ||
                              item.creator_image ||
                              item.authorImage ||
                              item.author_image
                            }
                            alt={item.creatorName || item.creator_name || "creator"}
                            className="pp-author"
                            wrapperStyle={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <span>{item.creatorName || item.creator_name}</span>
                      </Link>
                    </div>
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
