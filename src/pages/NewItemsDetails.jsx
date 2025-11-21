import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import EthImage from "../images/ethereum.svg";
import AuthorImageFallback from "../images/author_thumbnail.jpg";

// Skeleton loader while fetching
const NewItemsDetailsSkeleton = () => {
  return (
    <div className="container my-5" data-aos="fade-in">
      <div className="row">
        <div className="col-md-6">
          <div style={{ width: "100%", height: "400px", background: "#eee" }}></div>
        </div>
        <div className="col-md-6">
          <div style={{ width: "80%", height: "30px", background: "#eee", marginBottom: "10px" }}></div>
          <div style={{ width: "60%", height: "20px", background: "#eee", marginBottom: "10px" }}></div>
          <div style={{ width: "100%", height: "200px", background: "#eee" }}></div>
        </div>
      </div>
    </div>
  );
};

const NewItemsDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const nftRes = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        const foundItem = nftRes.data.find((i) => Number(i.nftId) === Number(nftId));
        setItem(foundItem || null);

        if (foundItem) {
          const authorRes = await axios.get(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${foundItem.authorId}`
          );
          setAuthor(authorRes.data || null);
        }
      } catch (err) {
        console.error("Failed to fetch NFT or author details", err);
        setItem(null);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [nftId]);

  if (loading) return <NewItemsDetailsSkeleton />;
  if (!item) return <p className="text-center mt-5">Item not found.</p>;

  const expiryDate = item.expiryDate
    ? new Date(item.expiryDate).toLocaleString()
    : "N/A";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">

            <div className="row">

              {/* NFT Image */}
              <div
                className="col-md-6 text-center"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                  onError={(e) => (e.currentTarget.src = "/fallback-nft.png")}
                />
              </div>

              {/* NFT Info */}
              <div
                className="col-md-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="item_info">

                  <h2 data-aos="fade-right" data-aos-delay="300">
                    {item.title}
                  </h2>

                  <div
                    className="item_info_counts"
                    data-aos="fade-right"
                    data-aos-delay="400"
                  >
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> {item.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> {item.likes || 0}
                    </div>
                  </div>

                  <p data-aos="fade-in" data-aos-delay="500">
                    {item.description || "No description available."}
                  </p>

                  <div
                    className="d-flex flex-row mb-3"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    {author && (
                      <div className="mr-4">
                        <h6>Owner</h6>

                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${author.authorId}`}>
                              <img
                                className="lazy"
                                src={author.authorImage || AuthorImageFallback}
                                alt={author.authorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>

                          <div className="author_list_info">
                            <Link to={`/author/${author.authorId}`}>
                              {author.authorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h6>Expiry Date</h6>
                      <div>{expiryDate}</div>
                    </div>
                  </div>

                  <div
                    className="de_tab tab_simple"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      {author && (
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${author.authorId}`}>
                              <img
                                className="lazy"
                                src={author.authorImage || AuthorImageFallback}
                                alt={author.authorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>

                          <div className="author_list_info">
                            <Link to={`/author/${author.authorId}`}>
                              {author.authorName}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price || "N/A"}</span>
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

export default NewItemsDetails;


