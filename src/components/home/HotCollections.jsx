import React from "react";
import { Link } from "react-router-dom";
import { useExploreItems } from "../../hooks/useExploreItems";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import ImageWithFallback from "../UI/ImageWithFallback";

const HotCollections = () => {
  const { items, loading, error } = useExploreItems();
  const collections = [...items]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4);

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
          {loading && (
            <div className="col-12 text-center py-4">Loading collections…</div>
          )}
          {error && !loading && (
            <div className="col-12 text-center py-4">{error}</div>
          )}
          {!loading && !error && collections.length === 0 && (
            <div className="col-12 text-center py-4">No collections available.</div>
          )}
          {!loading && !error && collections.map((item) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={item.nftId}
            >
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <ImageWithFallback
                      src={item.nftImage}
                      fallbackSrc={nftImage}
                      className="lazy img-fluid"
                      alt={item.title}
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <ImageWithFallback
                      className="lazy pp-coll"
                      src={item.authorImage}
                      fallbackSrc={AuthorImage}
                      alt={item.authorName}
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <span>Likes: {item.likes}</span>
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
