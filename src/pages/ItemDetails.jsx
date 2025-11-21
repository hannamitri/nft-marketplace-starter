import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import AuthorImageFallback from "../images/author_thumbnail.jpg";
import ItemDetailsSkeleton from "./ItemDetailsSkelleton";

// AOS for animations
import AOS from "aos";
import "aos/dist/aos.css";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    AOS.init({
      duration: 700,
      easing: "ease-out",
      once: false,
    });

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
        setTimeout(() => AOS.refresh(), 50);
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

              {/* NFT IMAGE */}
              <div
                className="col-md-6 text-center mb-3"
                data-aos="zoom-in"
                data-aos-duration="800"
              >
                <img
                  src={item.nftImage}
                  alt={item.title}
                  className="img-fluid img-rounded nft-image"
                  style={{ objectFit: "cover" }}
                  onError={(e) => (e.currentTarget.src = "/fallback-nft.png")}
                />
              </div>

              {/* NFT INFO */}
              <div
                className="col-md-6"
                data-aos="fade-left"
                data-aos-duration="900"
              >
                <h2 data-aos="fade-up" data-aos-delay="100">
                  {item.title}
                </h2>

                <span
                  data-aos="fade-up"
                  data-aos-delay="150"
                  className="text-muted"
                >
                  ERC-{nftCode}
                </span>

                <div
                  className="nft-item-price d-flex align-items-center mt-3 mb-3"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <img
                    src={EthImage}
                    alt="ETH"
                    style={{ width: "20px", marginRight: "6px" }}
                  />
                  <span>{nftPrice} ETH</span>
                </div>

                {/* DESCRIPTION */}
                {item.description && (
                  <p
                    data-aos="fade-up"
                    data-aos-delay="250"
                    style={{ lineHeight: "1.6" }}
                  >
                    {item.description}
                  </p>
                )}

                {/* AUTHOR INFO */}
                {author.authorName && (
                  <div
                    className="mt-3 d-flex align-items-center"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
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
                        onError={(e) =>
                          (e.currentTarget.src = "/fallback-author.png")
                        }
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
                        @{author.tag} • {author.followers} followers
                      </div>
                    </div>
                  </div>
                )}

                {/* EXTRA INFO */}
                <div data-aos="fade-up" data-aos-delay="350">
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
          </div>
        </section>

      </div>
    </div>
  );
};

export default ItemDetails;



