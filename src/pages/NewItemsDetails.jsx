import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import AuthorImageFallback from "../images/author_thumbnail.jpg";

// Skeleton loader while fetching
const NewItemsDetailsSkeleton = () => {
  return (
    <div className="container my-5">
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
  const [authorName, setAuthorName] = useState("Unknown");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        // Fetch the NFT item data
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const foundItem = res.data.find((i) => i.nftId.toString() === nftId);
        setItem(foundItem);

        // Fetch author info if you have an API (replace URL with your author API)
        // Here we assume a mock mapping since API doesn’t provide author name
        const authorMap = {
          83937449: "Monica Lucas",
          83937450: "John Doe",
          83937451: "Jane Smith"
        };
        if (foundItem) setAuthorName(authorMap[foundItem.authorId] || "Unknown");

      } catch (err) {
        console.error("Failed to fetch NFT item", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [nftId]);

  if (loading) return <NewItemsDetailsSkeleton />;
  if (!item) return <p className="text-center mt-5">Item not found.</p>;

  // Format expiry date
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
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                  onError={(e) => (e.currentTarget.src = "/fallback-nft.png")}
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> {item.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> {item.likes || 0}
                    </div>
                  </div>

                  <p>{item.description || "No description available."}</p>

                  <div className="d-flex flex-row mb-3">
                    <div className="mr-4">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy"
                              src={item.authorImage || AuthorImageFallback}
                              alt={authorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId}`}>{authorName}</Link>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h6>Expiry Date</h6>
                      <div>{expiryDate}</div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy"
                              src={item.authorImage || AuthorImageFallback}
                              alt={authorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId}`}>{authorName}</Link>
                        </div>
                      </div>
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

