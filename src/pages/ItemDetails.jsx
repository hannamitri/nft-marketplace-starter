import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import AuthorImageFallback from "../images/author_thumbnail.jpg";
import ItemDetailsSkeleton from "./ItemDetailsSkelleton"; // your skeleton loader

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNFT = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setItem(res.data);
      } catch (err) {
        console.error("Failed to fetch NFT", err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNFT();
  }, [nftId]);

  if (loading) return <ItemDetailsSkeleton />;
  if (!item) return <p className="text-center mt-5">NFT not found</p>;

  const author = item.author || {};
  const nftPrice = item.price || "N/A";
  const nftCode = item.code || "N/A";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* NFT Image */}
              <div className="col-md-6 text-center mb-3">
                <img
                  src={item.nftImage}
                  alt={item.title}
                  className="img-fluid img-rounded nft-image"
                  style={{ objectFit: "cover" }}
                  onError={(e) => (e.currentTarget.src = "/fallback-nft.png")}
                />
              </div>

              {/* NFT Info */}
              <div className="col-md-6">
                <h2>{item.title}</h2>
                <span>ERC-{nftCode}</span>
                
                <div className="nft-item-price d-flex align-items-center mt-3 mb-3">
                  <img src={EthImage} alt="ETH" style={{ width: "20px", marginRight: "6px" }} />
                  <span>{nftPrice} ETH</span>
                </div>

                {/* Description */}
                {item.description && <p>{item.description}</p>}

                {/* Author Info */}
                {author.authorName && (
                  <div className="mt-3 d-flex align-items-center">
                    <Link to={`/author/${author.authorId}`}>
                      <img
                        src={author.authorImage || AuthorImageFallback}
                        alt={author.authorName}
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        onError={(e) => (e.currentTarget.src = "/fallback-author.png")}
                      />
                    </Link>
                    <div className="ms-2">
                      <Link
                        to={`/author/${author.authorId}`}
                        style={{ textDecoration: "none", color: "#000" }}
                      >
                        {author.authorName}
                      </Link>
                      <div className="text-muted">
                        @{author.tag} &middot; {author.followers} followers
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                {item.expiryDate && (
                  <div className="mt-3">
                    <strong>Expiry Date:</strong>{" "}
                    {new Date(item.expiryDate).toLocaleString()}
                  </div>
                )}
                {item.views !== undefined && (
                  <div>
                    <strong>Views:</strong> {item.views}
                  </div>
                )}
                {item.likes !== undefined && (
                  <div>
                    <strong>Likes:</strong> {item.likes}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;



