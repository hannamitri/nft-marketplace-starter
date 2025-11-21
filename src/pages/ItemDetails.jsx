import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import ItemDetailsSkeleton from "./ItemDetailsSkelleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItem = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const found = res.data.find((nft) => nft.nftId === Number(nftId));
        setItem(found || null);
      } catch (err) {
        console.error("Failed to fetch NFT details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [nftId]);

  if (loading) return <ItemDetailsSkeleton />;
  if (!item) return <p className="text-center mt-5">NFT not found</p>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center mb-3">
                <img
                  src={item.nftImage}
                  alt={item.title}
                  className="img-fluid img-rounded nft-image"
                  style={{ objectFit: "cover" }}
                  onError={(e) => (e.currentTarget.src = "/fallback-nft.png")}
                />
              </div>
              <div className="col-md-6">
                <h2>{item.title}</h2>
                <span>ERC-{item.code}</span>
                <div className="nft-item-price d-flex align-items-center mt-3">
                  <img src={EthImage} alt="ETH" style={{ width: "20px", marginRight: "6px" }} />
                  <span>{item.price || "N/A"}</span>
                </div>
                <div className="mt-3 d-flex align-items-center">
                  <img
                    src={item.authorImage}
                    alt={item.title}
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
                    onError={(e) => (e.currentTarget.src = "/fallback-author.png")}
                  />
                  <div className="ms-2">{item.authorId}</div>
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

