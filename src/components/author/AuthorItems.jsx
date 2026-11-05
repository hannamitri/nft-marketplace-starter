import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthorItems = ({ author }) => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchAuthorItems() {
  try {
    setLoading(true);
    setError("");

    // Fetch from both APIs at the same time
    const [newItemsResponse, hotCollectionsResponse] =
      await Promise.all([
        axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        ),
        axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        ),
      ]);

      // Combine both API responses
      const allItems = [
        ...newItemsResponse.data,
        ...hotCollectionsResponse.data,
      ];

      // Only keep items belonging to this author
      const authorItems = allItems.filter(
        (item) => item.authorId === author?.authorId
      );

      setItems(authorItems);

      console.log("All author items:", authorItems);

      } catch (error) {
        console.error("Error fetching author items:", error);
        setError("Unable to load this author's items.");
      } finally {
        // Keep skeleton visible for at least 1 second
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }

  useEffect(() => {
    if (author?.authorId) {
      fetchAuthorItems();
    } else {
      setLoading(false);
    }
  }, [author?.authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">

          {loading ? (
            // Skeleton loading cards
            new Array(4).fill(0).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="nft__item author-item-skeleton">

                  {/* NFT image skeleton */}
                  <div className="author-skeleton-image"></div>

                  {/* Author profile skeleton */}
                  <div className="author-skeleton-profile"></div>

                  {/* NFT title skeleton */}
                  <div className="author-skeleton-title"></div>

                  {/* NFT price skeleton */}
                  <div className="author-skeleton-price"></div>

                  {/* NFT likes skeleton */}
                  <div className="author-skeleton-likes"></div>

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
                key={item.id}
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
