import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HOT_COLLECTIONS_ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCollections = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await fetch(HOT_COLLECTIONS_ENDPOINT);
        if (!response.ok) {
          throw new Error("Failed to fetch hot collections");
        }

        const data = await response.json();
        if (isMounted) {
          setCollections(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (isMounted) {
          setHasError(true);
          setCollections([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCollections();

    return () => {
      isMounted = false;
    };
  }, []);

  const cardsToRender = isLoading
    ? new Array(4).fill({})
    : collections.slice(0, 4);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {cardsToRender.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img
                      src={isLoading ? nftImage : item.nftImage || nftImage}
                      className="lazy img-fluid"
                      alt={isLoading ? "Loading collection" : item.title || "Collection"}
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img
                      className="lazy pp-coll"
                      src={isLoading ? AuthorImage : item.authorImage || AuthorImage}
                      alt={isLoading ? "Loading author" : item.title || "Author"}
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{isLoading ? "Loading..." : item.title || "Untitled Collection"}</h4>
                  </Link>
                  <span>{isLoading ? "" : `ERC-${item.code ?? "N/A"}`}</span>
                </div>
              </div>
            </div>
          ))}
          {!isLoading && hasError && (
            <div className="col-lg-12 text-center">
              <p>Hot collections are temporarily unavailable.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
