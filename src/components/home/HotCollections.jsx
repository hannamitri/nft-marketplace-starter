import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HOT_COLLECTIONS_API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadCollections = async () => {
      try {
        const response = await axios.get(HOT_COLLECTIONS_API);
        if (isMounted) {
          setCollections(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        if (isMounted) {
          setCollections([]);
        }
      }
    };

    loadCollections();

    return () => {
      isMounted = false;
    };
  }, []);

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
          {collections.map((collection, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={collection.id ?? index}
            >
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img
                      src={collection.nftImage || nftImage}
                      className="lazy img-fluid"
                      alt={collection.title || "Collection"}
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img
                      className="lazy pp-coll"
                      src={collection.authorImage || AuthorImage}
                      alt={collection.title || "Author"}
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title || "Untitled Collection"}</h4>
                  </Link>
                  <span>
                    {collection.code ? `ERC-${collection.code}` : "ERC-721"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
