import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useEffect, useState } from "react";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ author, onLoadingChange }) => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    if (!author?.authorId) {
      setLoading(false);
      onLoadingChange(false);
      return;
    }

    // Wait for the Author API to provide the NFT collection
    if (!Array.isArray(author.nftCollection)) {
      setLoading(true);
      onLoadingChange(true);
      return;
    }

    setLoading(true);
    onLoadingChange(true);
    setError("");

    try {
      // Get all NFTs from this author's collection
      const authorItems = author.nftCollection.map((item) => ({
        ...item,
        authorId: author.authorId,
        authorName: author.authorName,
        authorImage: author.authorImage,
        tag: author.tag,
      }));

      setItems(authorItems);

      console.log("Author's NFT collection:", authorItems);
    } catch (error) {
      console.error("Error loading author items:", error);
      setError("Unable to load this author's items.");
    }

    // Keep skeleton visible for 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      onLoadingChange(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [author?.authorId, author?.nftCollection]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            new Array(8).fill(0).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="nft__item">
                  
                  {/* NFT image skeleton */}
                  <Skeleton
                    width="100%"
                    height="200px"
                    borderRadius="8px"
                  />

                  {/* Author profile skeleton */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "-25px" }}>
                    <Skeleton
                      width="55px"
                      height="55px"
                      borderRadius="50%"
                    />
                  </div>

                  {/* NFT title skeleton */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                    <Skeleton
                      width="75%"
                      height="20px"
                      borderRadius="5px"
                    />
                  </div>

                  {/* NFT price skeleton */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
                    <Skeleton
                      width="45%"
                      height="16px"
                      borderRadius="5px"
                    />
                  </div>

                  {/* NFT likes skeleton */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
                    <Skeleton
                      width="30%"
                      height="15px"
                      borderRadius="5px"
                    />
                  </div>

                </div>
              </div>
            ))
          ) : error ? (
            <p>{error}</p>
          ) : !author ? (
            <p>Author information not found.</p>
          ) : items.length === 0 ? (
            <p>This author has no items available.</p>
          ) : (
            items.map((item) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.nftId || item.id}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="/author" state={{ author }}>
                      <img
                        className="lazy"
                        src={item.authorImage || AuthorImage}
                        alt={author.authorName || "Author"}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>

                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to="/item-details" state={{ item }}>
                      <img
                        src={item.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title || "NFT"}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to="/item-details" state={{ item }}>
                      <h4>{item.title}</h4>
                    </Link>

                    <div className="nft__item_price">
                      {item.price != null
                        ? `${item.price} ETH`
                        : "Price unavailable"}
                    </div>

                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes ?? 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
