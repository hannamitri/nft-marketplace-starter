import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import HotCollectionCardSkeleton from "../common/HotCollectionCardSkeleton";
import { useExploreNftsContext } from "../../context/ExploreNftsContext";

const HOT_COLLECTIONS_COUNT = 4;

const HotCollections = () => {
  const { uniqueItems, loading, error } = useExploreNftsContext();
  const items = uniqueItems.slice(0, HOT_COLLECTIONS_COUNT);

  return (
    <section
      id="section-collections"
      className="no-bottom"
      data-aos="fade-up"
      data-aos-easing="ease-out"
      data-aos-duration="800"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading &&
            new Array(HOT_COLLECTIONS_COUNT)
              .fill(0)
              .map((_, index) => <HotCollectionCardSkeleton key={`hot-${index}`} />)}
          {error && (
            <div className="col-md-12 text-center">
              <p>{error}</p>
            </div>
          )}
          {!loading &&
            !error &&
            items.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link
                    to={
                      item.nftId !== undefined &&
                      item.nftId !== null &&
                      item.nftId !== ""
                        ? `/item-details/${item.nftId}`
                        : "/item-details"
                    }
                    state={{ selectedItem: item }}
                  >
                    <img
                      src={item.nftImage || nftImage}
                      className="lazy img-fluid"
                      alt={item.title || "Collection"}
                      onError={(event) => {
                        event.currentTarget.src = nftImage;
                      }}
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link
                    to={
                      item.authorId !== undefined &&
                      item.authorId !== null &&
                      item.authorId !== ""
                        ? `/author/${item.authorId}`
                        : "/author"
                    }
                    state={{ authorImage: item.authorImage }}
                  >
                    <img
                      className="lazy pp-coll"
                      src={item.authorImage || AuthorImage}
                      alt={item.title || "Author"}
                      onError={(event) => {
                        event.currentTarget.src = AuthorImage;
                      }}
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{item.title || "Untitled Collection"}</h4>
                  </Link>
                  <span>{item.nftId ? `NFT #${item.nftId}` : "ERC-192"}</span>
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
