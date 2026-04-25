import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import HotCollectionCardSkeleton from "../common/HotCollectionCardSkeleton";
import { useExploreNftsContext } from "../../context/ExploreNftsContext";

const HOT_COLLECTIONS_COUNT = 4;

const HotCollections = () => {
  const { uniqueItems, loading, error } = useExploreNftsContext();

  const collectionItems = useMemo(() => {
    if (uniqueItems.length === 0) {
      return [];
    }
    if (uniqueItems.length > HOT_COLLECTIONS_COUNT) {
      return uniqueItems.slice(
        HOT_COLLECTIONS_COUNT,
        HOT_COLLECTIONS_COUNT * 2
      );
    }
    return uniqueItems.slice(0, HOT_COLLECTIONS_COUNT);
  }, [uniqueItems]);

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
          {loading &&
            Array.from({ length: HOT_COLLECTIONS_COUNT }, (_, index) => (
              <HotCollectionCardSkeleton key={`hot-coll-skeleton-${index}`} />
            ))}
          {error && (
            <div className="col-lg-12 text-center">
              <p>{error}</p>
            </div>
          )}
          {!loading &&
            !error &&
            collectionItems.map((item) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.id ?? item.nftId}
              >
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
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt={item.title || "Collection preview"}
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
                    >
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage}
                        alt="Collection author"
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{item.title || "Untitled"}</h4>
                    </Link>
                    <span>NFT · {item.nftId ?? "—"}</span>
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
