import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImageFallback from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const placeholders = new Array(12).fill(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setTopSellers(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("topSellers error:", err))
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const listToRender = loading ? placeholders : topSellers;

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-md-12">
            <ol className="author_list">
              {listToRender.map((seller, index) => {
                const isPlaceholder = loading || !seller;

                const keyId = seller?.id ?? index;

                const authorId = String(seller?.authorId ?? "").trim();
                const authorLink = authorId ? `/author/${authorId}` : "#";

                const authorName = seller?.authorName ?? "Unknown";
                const authorImage = seller?.authorImage ?? AuthorImageFallback;

                const priceValue = Number(seller?.price);
                const priceText = Number.isFinite(priceValue)
                  ? priceValue.toFixed(1)
                  : String(seller?.price ?? "0.0");

                return (
                  <li key={keyId}>
                    <div className="author_list_pp">
                      <Link
                        to={isPlaceholder ? "#" : authorLink}
                        onClick={(e) =>
                          (isPlaceholder || !authorId) && e.preventDefault()
                        }
                      >
                        <img
                          className="lazy pp-author"
                          src={isPlaceholder ? AuthorImageFallback : authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link
                        to={isPlaceholder ? "#" : authorLink}
                        onClick={(e) =>
                          (isPlaceholder || !authorId) && e.preventDefault()
                        }
                      >
                        {isPlaceholder ? "Loading..." : authorName}
                      </Link>
                      <span>{isPlaceholder ? "0.0" : priceText} ETH</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

